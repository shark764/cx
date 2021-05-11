import { wfm } from '.';
import { useQuery } from 'react-query';
import { operations, components } from '@cx/cxapi/forecast-schema';
type Error = components["schemas"]["HTTPValidationError"]; // 422 res code

type TimelineSeriesData = components["schemas"]["ForecastTimelineSeriesDTO"];
type TimelineSeriesRequestObject = components["schemas"]["ForecastTimelineSeriesQueryDTO"];
type TimelineQueryPathParams = operations["timeline_series_queries_tenants_tenant_id_forecasttimelines_timeline_id_series_query"]["parameters"]["path"];
interface TimelineRequest {
  pathParams: TimelineQueryPathParams;
  body: TimelineSeriesRequestObject;
};

export const useTimelineQuery = (historicalPathParams: any, historicalQueryParams: any, selectedTimeline: any, selectedCompetence: any, viewBy: any) => useQuery<TimelineSeriesData, Error>(
  ['Timeline Query', historicalPathParams, historicalQueryParams, selectedTimeline, selectedCompetence, viewBy],
  () => {
    const requestDetails: TimelineRequest = {
      pathParams: { tenant_id: historicalPathParams.tenant_id, timeline_id: selectedTimeline?.id },
      body: {
        startDate: historicalQueryParams.startDateTime,
        endDate: historicalQueryParams.endDateTime,
        interval: viewBy,
        /**
         * TODO: right now we are selecting only one competency which the user has selected and is in state
         * however the api can support mulitple as an array but testing would need to be done to see what is more
         * efficient..   getting all competencies or just the one your interested in?
         */
        competencyIds: [
          selectedCompetence
        ],
        channels: ['voice', 'messaging', 'sms', 'email', 'work-item'],
        directions: ['inbound'],
        includeAdjustments: true,
        includeForecast: true,
      }
    }
    if (selectedTimeline && selectedCompetence) {
      return wfm.forecasting.api
        .timeline_series_queries_tenants_tenant_id_forecasttimelines_timeline_id_series_query(requestDetails)
    }
  },
  {
    refetchOnWindowFocus: false,
  }
);
