import { OpenApi } from './open-api';
import forecast from './forecast.json';
import planning from './planning.json';

const protocol = 'https';
const basePathOverride = '';

const specificationWithOverridesForecast = (spec: any) => ({
  ...spec,
  protocol: protocol,
  host: 'qe-api.cxengagelabs.net/v1',
  basePath: basePathOverride,
});

const specificationWithOverridesPlanning = (spec: any) => ({
  ...spec,
  protocol: protocol,
  host: 'qe-api.cxengagelabs.net/v1',
  basePath: basePathOverride,
});

export const CXAPI = (authToken: string) => ({
  planning: new OpenApi(specificationWithOverridesPlanning(planning), authToken),
  // agents: new OpenApi(specificationWithOverrides(agents), authToken),
  forecasting: new OpenApi(specificationWithOverridesForecast(forecast), authToken),
});
