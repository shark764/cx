import axios from 'axios';
import { DashboardRequest, EntityTypes } from 'settings/types';

const tempToken = localStorage.getItem('TOKEN-CX-API');

export const sendBatchRequest = async (
  tenantId: string,
  requests: DashboardRequest,
) => {
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
