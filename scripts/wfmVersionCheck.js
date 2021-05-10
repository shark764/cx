const { writeFileSync } = require('fs');
const axios = require('axios');
const package = require('../packages/wfm/package.json');
const openapiTS = require("openapi-typescript").default;

const writeIt = (it) => {
  if(it) {
    console.log('New wfm forecast api version available, fetching new version');
    writeFileSync('../packages/cxapi/forecast.json', JSON.stringify(it, null, 2), 'utf8');
    writeFileSync('../packages/cxapi/forecast-schema.ts', openapiTS(it), 'utf8');
    writeFileSync('../packages/wfm/package.json', JSON.stringify({...package, wfmForecastApiVersion: it.info.version}, null, 2), 'utf8');
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


const packageApiVersion = parseVersion(package.wfmForecastApiVersion);
axios.get('http://us-east-1-qe-wfm-cx-forecast.cxengagelabs.net/openapi.json')
  .then(({data}) => {
    const localApiVersion = parseVersion(data.info.version)
    return compareVersionNumbers(localApiVersion, packageApiVersion) ?
      data :
      null
  })
  .then(writeIt);