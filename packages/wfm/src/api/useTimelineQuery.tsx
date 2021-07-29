import { wfm } from '.';
import { useQuery } from 'react-query';
import { operations, components } from '@cx/cxapi/forecast-schema';
type Error = components["schemas"]["HTTPValidationError"]; // 422 res code

type TimelineSeriesData = components["schemas"]["ForecastTimelineSeriesDTO"];
type TimelineSeriesRequestObject = components["schemas"]["ForecastTimelineSeriesQueryDTO"];
type TimelineQueryPathParams = operations["timeline_series_queries_tenants_tenant_id_wfm_forecasttimelines_timeline_id_series_query"]["parameters"]["path"];
interface TimelineRequest {
  pathParams: TimelineQueryPathParams;
  body: TimelineSeriesRequestObject;
};

export const useTimelineQuery = (tenant_id: any, historicalQueryParams: any, selectedTimeline: any, selectedCompetence: any, viewBy: any, channels: any[]) => useQuery<TimelineSeriesData, Error>(
  ['Timeline Query', tenant_id, historicalQueryParams, selectedTimeline, selectedCompetence, viewBy, channels],
  () => {
    const requestDetails: TimelineRequest = {
      pathParams: { tenant_id, timeline_id: selectedTimeline?.id },
      body: {
        startDate: historicalQueryParams.startDateTime,
        endDate: historicalQueryParams.endDateTime,
        interval: viewBy,
        competencyIds: [
          selectedCompetence
        ],
        channels: channels,
        directions: ['inbound'],
        includeAdjusted: true,
        includeForecast: true,
        includeStaffing: true,
      }
    }
    if (selectedTimeline && selectedCompetence) {
      return wfm.forecasting.api
        .timeline_series_queries_tenants_tenant_id_wfm_forecasttimelines_timeline_id_series_query(requestDetails)
    }
  },
  {
    refetchOnWindowFocus: false,
    enabled: !!tenant_id,
  }
);
