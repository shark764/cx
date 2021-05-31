import { useQuery } from 'react-query';
import { fetchTheme } from '@cx/fakedata/theme';
import axios from 'axios';
import { ThemeStyle } from 'providers/appThemeProvider';
import { EntityData } from '@cx/types/api';

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

export function useFetchGroups(tenantId: string) {
  return useQuery<EntityData[], Error>(
    ['fetchTenantGroups', { tenantId }],
    async () => {
      const { data } = await axios.get(
        `https://qe-api.cxengagelabs.net/v1/tenants/${tenantId}/groups`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${tempToken}`,
          },
        },
      );
      return data.result;
    },
    { refetchOnWindowFocus: false },
  );
}

export function useFetchSkills(tenantId: string) {
  return useQuery<EntityData[], Error>(
    ['fetchTenantSkills', { tenantId }],
    async () => {
      const { data } = await axios.get(
        `https://qe-api.cxengagelabs.net/v1/tenants/${tenantId}/skills`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${tempToken}`,
          },
        },
      );
      return data.result;
    },
    { refetchOnWindowFocus: false },
  );
}
