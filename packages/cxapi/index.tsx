import { OpenApi } from './open-api';
import forecast from './forecast.json';
import planning from './planning.json';

const basePathOverride = '/v1';

const specificationWithOverridesForecast = (spec: any) => ({
  ...spec,
  basePath: basePathOverride,
});

const specificationWithOverridesPlanning = (spec: any) => ({
  ...spec,
  basePath: basePathOverride,
});


const token = () => localStorage.getItem('token');
const baseUrl = () => localStorage.getItem('baseUrl');

export const CXAPI = (): any => {
  return {
    planning: new OpenApi(specificationWithOverridesPlanning(planning), token, baseUrl),
    // agents: new OpenApi(specificationWithOverrides(agents), token, baseUrl),
    forecasting: new OpenApi(specificationWithOverridesForecast(forecast), token, baseUrl),
  };
};
