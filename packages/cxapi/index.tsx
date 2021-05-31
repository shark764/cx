import { OpenApi } from './open-api';
import forecast from './forecast.json';
import planning from './planning.json';

const specificationWithOverrides = (spec: any) => ({
  ...spec,
  basePath: '/v1',
});

const token = () => localStorage.getItem('token');
const baseUrl = () => localStorage.getItem('baseUrl');

export const CXAPI = (): any => {
  return {
    planning: new OpenApi(specificationWithOverrides(planning), token, baseUrl),
    forecasting: new OpenApi(specificationWithOverrides(forecast), token, baseUrl),
  };
};
