import { OpenApi } from './open-api';
import forecast from './forecast.json';

const protocol = 'http';
const hostOverride = 'us-east-1-staging-wfm-cx-forecast.cxengagelabs.net';
const basePathOverride = '';

const specificationWithOverrides = (spec: any) => ({
  ...spec,
  protocol: protocol,
  host: hostOverride,
  basePath: basePathOverride,
});

export const WFMAPI = (authToken: string) => ({
  // planning: new OpenApi(specificationWithOverrides(planning), authToken),
  // agents: new OpenApi(specificationWithOverrides(agents), authToken),
  forecasting: new OpenApi(specificationWithOverrides(forecast), authToken),
});
