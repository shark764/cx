import { useQuery } from 'react-query';
import { fetchTheme } from '@cx/fakedata/theme';
import axios from 'axios';
import { ThemeStyle } from 'providers/appThemeProvider';
import { EntityData } from '@cx/types/api';
import { capitalize } from '@cx/utilities/string';
import { DashboardSetting } from 'redux/reducers/main';
import { realtimeDashboardsSettings } from 'settings/settings';
import { EntityTypes, fetchEntity, sendBatchRequest } from './requests';

const tempToken = localStorage.getItem('TOKEN-CX-API');

export function useBrandingTheme() {
  return useQuery<ThemeStyle, Error>(
    'fetchTheme',
    async () => {
      const { data }: any = await fetchTheme();
      return {
        ...data.result,
        styles: JSON.parse(data.result.styles),
      };
    },
    { refetchOnWindowFocus: false },
  );
}

interface DashboardData extends EntityData {
  activeVersion: string;
  activeDashboard: DashboardSetting;
}
export function useFetchSingleDashboard(
  tenantId: string,
  dashboardId: string,
  enabled = true,
) {
  return useQuery<DashboardData, Error>(
    ['fetchSingleTenantDashboard', { tenantId, dashboardId }],
    async () => {
      const { data } = await axios.get(
        `https://qe-api.cxengagelabs.net/v1/tenants/${tenantId}/dashboards/${dashboardId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${tempToken}`,
          },
        },
      );
      return data.result;
    },
    {
      refetchOnWindowFocus: false,
      // We use enabled param to disable query
      // from automatically running
      enabled,
    },
  );
}

export function useDashboardPoll(
  tenantId: string,
  requests: any[],
  enabled = true,
) {
  return useQuery<any, Error>(
    ['dashboardPoll', { tenantId, requests }],
    async () => sendBatchRequest(tenantId, requests),
    {
      refetchInterval: realtimeDashboardsSettings.refreshRate,
      // We use enabled param to disable query
      // from automatically running
      enabled,
    },
  );
}

export function useFetchEntity(
  tenantId: string,
  entity: EntityTypes,
  queryParams = '',
) {
  return useQuery<EntityData[], Error>(
    [`fetchTenant${capitalize(entity)}`, { tenantId }],
    async () => fetchEntity(tenantId, entity, queryParams),
    { refetchOnWindowFocus: false },
  );
}
