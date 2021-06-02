import axios from 'axios';

const tempToken = localStorage.getItem('TOKEN-CX-API');

export const sendBatchRequest = async (tenantId: string, requests: any[]) => {
  const { data } = await axios.post(
    `https://qe-api.cxengagelabs.net/v1/tenants/${tenantId}/realtime-statistics/batch`,
    {
      requests,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${tempToken}`,
      },
    },
  );
  return data.results;
};

export type EntityTypes =
  | 'users'
  | 'queues'
  | 'skills'
  | 'groups'
  | 'reasons'
  | 'dashboards';

export const fetchEntity = async (
  tenantId: string,
  entity: EntityTypes,
  queryParams = '',
) => {
  const { data } = await axios.get(
    `https://qe-api.cxengagelabs.net/v1/tenants/${tenantId}/${entity}${
      queryParams !== '' ? `?${queryParams}` : ''
    }`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${tempToken}`,
      },
    },
  );
  return data.result;
};
