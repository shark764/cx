import { OpenApi } from './open-api';
import forecast from './forecast.json';
import planning from './planning.json';

const protocol = 'http';
const basePathOverride = '';

const specificationWithOverridesForecast = (spec: any) => ({
  ...spec,
  protocol: protocol,
  host: 'us-east-1-qe-wfm-cx-forecast.cxengagelabs.net',
  basePath: basePathOverride,
});

const specificationWithOverridesPlanning = (spec: any) => ({
  ...spec,
  protocol: protocol,
  host: 'us-east-1-qe-wfm-cx-planning.cxengagelabs.net',
  basePath: basePathOverride,
});

export const CXAPI = (authToken: string) => ({
  planning: new OpenApi(specificationWithOverridesPlanning(planning), authToken),
  // agents: new OpenApi(specificationWithOverrides(agents), authToken),
  forecasting: new OpenApi(specificationWithOverridesForecast(forecast), authToken),
});
