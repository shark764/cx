#!groovy​
@Library('sprockets@2.11.0') _

import common
import git
import teams
import node
import frontend

def service = 'cx'
def docker_tag = BUILD_TAG.toLowerCase()
def pr = env.CHANGE_ID
def c = new common()
def mt = new teams()
def n = new node()
def f = new frontend()

node(){
  pwd = pwd()
}
//This will stop all old builds so that things are not running in parallel.
c.stop_previous_builds(env.JOB_NAME, env.BUILD_NUMBER.toInteger())

pipeline {
  agent any
  stages {
    stage ('Setup') {
      parallel {
        stage ('Set build version') {
          steps {
            sh 'echo "Stage Description: Set build version from package.json"'
            script{
              buildTool = c.getBuildTool()
              props = c.exportProperties(buildTool)
              build_version = readFile('version')
            }
          }
        }
        stage ('Setup Docker') {
          steps {
            sh 'echo "Stage Description: Sets up docker image for use in the next stages"'
            sh "rm -rf build; mkdir build -p"
            sh "docker build -t ${docker_tag} -f Dockerfile ."
            sh "docker run --rm -t -d --name=${docker_tag} ${docker_tag}"
          }
        }
      }
    }
    stage ('Lint and Build') {
      when { changeRequest() }
      parallel {
        stage ('Lint') {
          steps {
            sh 'echo "Stage Description: Lints the project for common js errors and formatting"'
            // sh "docker exec ${docker_tag} npm run lint"
          }
        }
        stage ('Build') {
          steps {
            sh 'echo "Stage Description: Builds the production version of the app"'
            sh "docker exec ${docker_tag} npm run build"
            sh "docker cp ${docker_tag}:/home/node/app/packages/wfm/build build"
          }
        }
      }
    }
    stage ('Build') {
      when { anyOf {branch 'main'; branch 'develop'; branch 'hotfix'}}
      steps {
        sh 'echo "Stage Description: Builds the production version of the app"'
        sh "docker exec ${docker_tag} npm run build"
        sh "docker cp ${docker_tag}:/home/node/app/packages/wfm/build build"
      }
    }
    stage ('Dev temp build') {
      when { changeRequest() }
      steps {
        sh "echo 'Stage Description: Creates a temp build of the site in dev'"
        sh "aws s3 rm s3://frontend-prs.cxengagelabs.net/cxwfm/${pr}/ --recursive"
        sh "sed -i 's/\\\"\\/main/\\\"\\/cxwfm\\/${pr}\\/main/g' build/build/index.html"
        sh "aws s3 sync build/build/ s3://frontend-prs.cxengagelabs.net/cxwfm/${pr}/ --delete"
      }
    }
    stage ('Testing') {
      when { changeRequest() }
      parallel {
        stage ('Unit Tests') {
          steps {
            sh 'echo "Stage Description: Runs unit tests and fails if they do not meet coverage expectations"'
            // sh "docker exec ${docker_tag} npm run test:coverage"
          }
        }
        stage ('Automation Tests') {
          steps {
            sh 'echo "Stage Description: Runs automation tests in the Dev temp pr build"'
            // sh "docker exec ${docker_tag} /bin/bash -c 'export URI=https://frontend-prs.cxengagelabs.net/cxwfm/${pr}/index.html#/ && npm run regression'"
          }
        }
      }
    }
    stage ('Preview PR') {
      when { changeRequest() }
      steps {
        sh "echo 'Stage Description: Notifies team members that the PR is ready for review'"
        script {
          f.invalidate("E23K7T1ARU8K88")
          office365ConnectorSend status:"Ready for review", message:"<a href=\"https://frontend-prs.cxengagelabs.net/cxwfm/${pr}/index.html\">CXWFM-UI PR Preview</a>", webhookUrl:"https://outlook.office.com/webhook/046fbedf-24a1-4c79-8e4a-3f73437d9de5@1d8e6215-577d-492c-9fe9-b3c9e7d65fdd/JenkinsCI/26ba2757836d431c8310fbfbfbb905dc/4060fcf8-0939-4695-932a-b8d400889db6"
        }
      }
    }
    stage ('Push new tag') {
      when { anyOf {branch 'main'; branch 'develop'; branch 'hotfix'}}
      steps {
        script {
          try {
            sh 'echo "Makes a github tagged release under a new branch with the same name as the tag version"'
            git url: "git@github.com:SerenovaLLC/${service}"
            sh "git checkout -b build-${BUILD_TAG}"
            if (build_version.contains("SNAPSHOT")) {
              sh "if git tag --list | grep ${build_version}; then git tag -d ${build_version}; git push origin :refs/tags/${build_version}; fi"
            }
            sh "git tag -a ${build_version} -m 'release ${build_version}, Jenkins tagged ${BUILD_TAG}'"
            sh "git push origin ${build_version}"
          } catch (e) {
            sh 'echo "Failed create git tag"'
          }
        }
      }
    }
    stage ('Create staging build') {
      when { anyOf {branch 'master'; branch 'develop'; branch 'hotfix'}}
      steps {
        sh 'echo "Stage Description: Pushes built app to S3"'
        sh "aws s3 sync build/build/ s3://frontend-prs.cxengagelabs.net/staging/builds/cxwfm/${build_version}/ --delete"
      }
    }

  }
  post {
    always {
      script {
        try {
          sh "docker rmi ${docker_tag} --force"
        } catch(e) {
          sh 'echo "Failed to remove docker image"'
        }
        c.cleanup()
      }
    }
    success {
      script {
        sh 'echo Built ok'
        mt.teamsPullRequestSuccess("${service}",
                                   "${build_version}",
                                   "https://outlook.office.com/webhook/046fbedf-24a1-4c79-8e4a-3f73437d9de5@1d8e6215-577d-492c-9fe9-b3c9e7d65fdd/JenkinsCI/26ba2757836d431c8310fbfbfbb905dc/4060fcf8-0939-4695-932a-b8d400889db6")
      }
    }
    failure {
      script {
        sh 'echo Built NOT ok'
        mt.teamsPullRequestFailure("${service}",
                                   "${build_version}",
                                   "https://outlook.office.com/webhook/046fbedf-24a1-4c79-8e4a-3f73437d9de5@1d8e6215-577d-492c-9fe9-b3c9e7d65fdd/JenkinsCI/26ba2757836d431c8310fbfbfbb905dc/4060fcf8-0939-4695-932a-b8d400889db6")
      }
    }
    unstable {
      echo 'This will run only if the run was marked as unstable'
    }
    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }
}