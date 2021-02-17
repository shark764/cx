const { OpenApi } = require('./open-api');
const planning = require('./planning.json');
const agents = require('./agents.json');
const forecast = require('./forecast.json');

const example = "http://us-east-1-staging-wfm-cx-forecast.cxengagelabs.net/tenants/00000000-0000-0000-0000-000000000000/competencies/00000000-0000-0000-0000-000000000000/historical?channel=voice&direction=inbound&startDateTime=2021-01-01T00:00:00Z&endDateTime=2021-01-30T00:00:00Z"
const protocol = 'http';
const hostOverride = 'us-east-1-staging-wfm-cx-forecast.cxengagelabs.net';
const basePathOverride = '';

const specificationWithOverrides = (spec) => ({
  ...spec,
  protocol: protocol,
  host: hostOverride,
  basePath: basePathOverride,
});

const fakeTenantId = '00000000-0000-0000-0000-000000000000';
const fakeCompetnecyId = '00000000-0000-0000-0000-000000000000';

// class WfmApi extends OpenApi {
//   // good spot for helper methods in case you need to combine api requests
//   createSomeData(testCaseData, testStepData) {
//     return this.api.customFunction({ body: dummyData })
//       .then(response =>
//         this.api.createOtherBasedOnPrevious({ pathParams: { testCaseKey: response.key }, body: testStepData })
//       );
//   }
// };

// exports.WfmApi = WfmApi;


const Planning = new OpenApi(specificationWithOverrides(planning), 'auth token goes here');
const Agents = new OpenApi(specificationWithOverrides(agents), 'auth token goes here');
const Forecast = new OpenApi(specificationWithOverrides(forecast), 'auth token goes here');

// console.log(Planning.listMethods());
// console.log(Agents.listMethods());
// console.log(Forecast.listMethods());

Forecast.api.retrieve_a_set_of_historical_data({
  pathParams: {
    tenantId: fakeTenantId,
    competencyId: fakeCompetnecyId,
  },
  // body: testStepData,
  qs: {
    channel: 'voice',
    direction: 'inbound',
    startDateTime: '2021-01-01T00:00:00Z',
    endDateTime: '2021-01-30T00:00:00Z',
  }
}).then(response => {
  console.log(response)
})
// console.log(forecast.api.retrieve_a_set_of_historical_data);