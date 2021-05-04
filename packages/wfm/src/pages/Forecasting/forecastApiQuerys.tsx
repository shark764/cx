import { wfm } from '../../api';
import { useQuery } from 'react-query';

export const useTimelines = (historicalPathParams: any) => useQuery<any, any>(
  ['timelinesData', historicalPathParams],
  () => wfm.forecasting.api.get_all_tenants_tenant_forecasttimelines({
    pathParams: { tenant_id: historicalPathParams.tenant_id },
  })
  .then(({data}: any) => ({
    data: data.map(({ description, id, name }: any) => ({
      label: name,
      id,
      description,
    }))
  })),
  {
    refetchOnWindowFocus: false
  }
);