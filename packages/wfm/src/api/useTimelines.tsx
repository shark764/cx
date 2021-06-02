import { wfm } from '.';
import { useQuery } from 'react-query';
import { AxiosPromise } from 'axios';
import { operations, components } from '@cx/cxapi/forecast-schema';
type Error = components["schemas"]["HTTPValidationError"]; // 422 res code

type TimelinesData = components["schemas"]["ForecastTimelineDTO"];
type TimelineQueryPathParams = operations["get_all_tenants_tenant_id_wfm_forecasttimelines"]["parameters"]["path"];
interface TimelineRequest {
  pathParams: TimelineQueryPathParams;
};

export type TimelinesDataResponse = AxiosPromise<TimelinesData[]>

interface ModifiedTimelines {
  label: string;
  id: string;
  description: string | undefined;
};

export const useTimelines = (tenant_id: string) => useQuery<TimelinesData[], Error>(
  ['Timelines', tenant_id],
  () => {

    const requestDetails: TimelineRequest = { pathParams: { tenant_id } };
    return wfm.forecasting.api.get_all_tenants_tenant_id_wfm_forecasttimelines(requestDetails)

      .then(( data: TimelinesData[]): ModifiedTimelines[] =>
        data.map(({ description, id, name }) => ({
          label: name,
          id,
          description,
        }))
      )
  },
  {
    refetchOnWindowFocus: false,
    enabled: !!tenant_id,
  }
);
