import { wfm } from '.';
import { useQuery } from 'react-query';
import { AxiosPromise } from 'axios';
import { operations, components } from '@cx/cxapi/forecast-schema';
type Error = components["schemas"]["HTTPValidationError"]; // 422 res code

type TimelinesData = components["schemas"]["ForecastTimelineDTO"];
type TimelineQueryPathParams = operations["get_all_tenants_tenant_id_forecasttimelines"]["parameters"]["path"];
interface TimelineRequest {
  pathParams: TimelineQueryPathParams;
};

export type TimelinesDataResponse = AxiosPromise<TimelinesData[]>

interface ModifiedTimelines {
  label: string;
  id: string;
  description: string | undefined;
};

export const useTimelines = (historicalPathParams: any) => useQuery<TimelinesData[], Error>(
  ['Timelines', historicalPathParams],
  () => {

    const requestDetails: TimelineRequest = {
      pathParams: { tenant_id: historicalPathParams.tenant_id }
    };
    return wfm.forecasting.api.get_all_tenants_tenant_id_forecasttimelines(requestDetails)

      .then(( data: TimelinesData[]): ModifiedTimelines[] =>
        data.map(({ description, id, name }) => ({
          label: name,
          id,
          description,
        }))
      )
  },
  {
    refetchOnWindowFocus: false
  }
);
