const { writeFileSync } = require('fs');
const axios = require('axios');
const package = require('../packages/wfm/package.json');
const openapiTS = require("openapi-typescript").default;

const capitalize = (value) => `${value.charAt(0).toUpperCase()}${value.substring(1,value.length)}`;

const WFM_SERVICE = 'planning'; // forecast or planning
const packageKey = `wfm${capitalize(WFM_SERVICE)}ApiVersion`;


const writeIt = (it) => {
  if(it) {
    console.log(`New wfm ${WFM_SERVICE} api version available, fetching new version`);
    writeFileSync(`../packages/cxapi/${WFM_SERVICE}.json`, JSON.stringify(it, null, 2), 'utf8');
    writeFileSync(`../packages/cxapi/${WFM_SERVICE}-schema.ts`, openapiTS(it), 'utf8');
    writeFileSync(`../packages/wfm/package.json`, JSON.stringify({...package, [packageKey]: it.info.version}, null, 2), 'utf8');
  }
};

const parseVersion = (versionText) =>
  versionText
    .split('.')
    .map((text) => text.replace(/\D/g, ''))
    .map((version) => parseInt(version, 0));

const compareVersionNumbers = (localVersion, packageVersion) => {
  const [localMajor, localMinor] = localVersion;
  const [packageMajor, packageMinor] = packageVersion;
  return Boolean(
    localMajor !== packageMajor ||
    localMinor !== packageMinor
  );
};


const packageApiVersion = parseVersion(package[packageKey]);
axios.get(`http://us-east-1-qe-wfm-cx-${WFM_SERVICE}.cxengagelabs.net/openapi.json`)
  .then(({data}) => {
    const localApiVersion = parseVersion(data.info.version)
    return compareVersionNumbers(localApiVersion, packageApiVersion) ?
      data :
      null
  })
  .then(writeIt);