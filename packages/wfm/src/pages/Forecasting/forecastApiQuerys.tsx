import { wfm } from '../../api';
import { useQuery } from 'react-query';
// @ts-ignore
import { DateTime } from 'luxon';
// import { operations, components } from '@cx/cxapi/forecast-schema';
// type HistoricalData = components["schemas"]["HistoricalDataDTO"];
// type HistoricalPathParams = operations["get_tenants_tenant_competencies_competency_historical"]["parameters"]["path"];
// type HistoricalQueryparams = operations["get_tenants_tenant_competencies_competency_historical"]["parameters"]["query"];
// type HistoricalApiError = components["schemas"]["HTTPValidationError"];

export const useTimelines = (historicalPathParams: any) => useQuery<any, any>(
  ['Timelines', historicalPathParams],
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

export const useTimelineQuery = (historicalPathParams: any, historicalQueryParams: any, selectedTimeline: any, selectedCompetence: any, viewBy: any) => useQuery<any, any>(
  ['Timeline Query', historicalPathParams, historicalQueryParams, selectedTimeline, selectedCompetence, viewBy],
  () => selectedTimeline && selectedCompetence && wfm.forecasting.api.timeline_series_queries_tenants_tenant_forecasttimelines_timeline_series_query({
    pathParams: { tenant_id: historicalPathParams.tenant_id, timeline_id: selectedTimeline.id},
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
  }), // TODO: change the memo function to instead just map the data here??
  {
    refetchOnWindowFocus: false,
    // enabled: false
  }
);

export const useTimelineAdjustments = (historicalPathParams: any, historicalQueryParams: any, selectedTimeline: any, viewBy: string) => useQuery<any, any>(
  ['Timeline Adjustments', historicalPathParams, selectedTimeline, viewBy],
  () => {
    // TODO: this seems to fire twice?
    const allAdjustmentStartDate = DateTime.fromISO(historicalQueryParams.startDateTime)
      .startOf('day').toISO({ includeOffset: Boolean(viewBy !== 'quarter-hour') });

    const allAdjustmentEndDate = DateTime.fromISO(historicalQueryParams.endDateTime)
      .endOf('day').toISO({ includeOffset: Boolean(viewBy !== 'quarter-hour') });

    return wfm.forecasting.api.get_all_tenants_tenant_forecasttimeline_forecast_timeline_adjustments({
      pathParams: {
        tenant_id: historicalPathParams.tenant_id, forecast_timeline_id: "eb195977-9ae0-44ae-bb7c-12af2a4975d3"
      },
      queryString: {
        interval: viewBy,
        channels: ['voice', 'messaging', 'sms', 'email', 'work_item'],
        directions: ['inbound'],
        startDateTime: allAdjustmentStartDate,
        endDateTime: allAdjustmentEndDate
      }
    })
  },
  {
    refetchOnWindowFocus: false
  }
);

// export const useCreateAdjustment = (historicalPathParams: any, viewBy: string, selectedCompetence: string, adjustment: any) => useQuery<any, any>(
//   ['New Adjustment', historicalPathParams, viewBy, selectedCompetence],
//   () => wfm.forecasting.api.post_tenants_tenant_forecasttimeline_forecast_timeline_adjustments({
//     pathParams: {
//       tenant_id: historicalPathParams.tenant_id, forecast_timeline_id: "94a42382-725f-48eb-8880-533cae2e1854"
//     },
//     body: {
//       startDateTime: adjustment.adjustmentStartDate.toISO({ suppressMilliseconds: true, includeOffset: false }),
//       endDateTime: adjustment.adjustmentEndDate.toISO({ suppressMilliseconds: true, includeOffset: false }),
//       intervalLength: viewBy,
//       competency: selectedCompetence,
//       channel: 'voice',
//       direction: 'inbound',
//       numberOfIntervals: 1,
//       type: 'percentage',
//       value: adjustment.value
//     }
//   }),
//   {
//     refetchOnWindowFocus: false,
//     enabled: false
//   }
// );
export const createAdjustment = (historicalPathParams: any, viewBy: string, selectedCompetence: string, adjustment: any) =>
  wfm.forecasting.api.post_tenants_tenant_forecasttimeline_forecast_timeline_adjustments({
    pathParams: {
      tenant_id: historicalPathParams.tenant_id, forecast_timeline_id: "eb195977-9ae0-44ae-bb7c-12af2a4975d3"
    },
    body: {
      startDateTime: adjustment.adjustmentStartDate.toISO({ suppressMilliseconds: true, includeOffset: false }),
      endDateTime: adjustment.adjustmentEndDate.toISO({ suppressMilliseconds: true, includeOffset: false }),
      intervalLength: viewBy,
      competency: selectedCompetence,
      channel: 'voice',
      direction: 'inbound',
      numberOfIntervals: 1,
      // type: 'percentage',
      type: 'absolute',
      value: adjustment.value
    }
  });

export const useUpdateAdjustment = (historicalPathParams: any, adjustment: any, viewBy: string, selectedCompetence: string) => useQuery<any, any>(
  ['Update Adjustment'],
  () => wfm.forecasting.api.patch_tenants_tenant_forecasttimeline_forecast_timeline_adjustments_adjustment_patch({
    pathParams: {
      tenant_id: historicalPathParams.tenant_id,
      forecast_timeline_id: "eb195977-9ae0-44ae-bb7c-12af2a4975d3",
      adjustment_id: adjustment.adjustmentId
    },
    body: {
      startDateTime: adjustment.adjustmentStartDate.toISO({ suppressMilliseconds: true, includeOffset: false }),
      endDateTime: adjustment.adjustmentEndDate.toISO({ suppressMilliseconds: true, includeOffset: false }),
      intervalLength: viewBy,
      competency: selectedCompetence,
      channel: 'voice',
      direction: 'inbound',
      numberOfIntervals: 1,
      type: 'percentage',
      value: adjustment.value
    }
  }),
  {
    refetchOnWindowFocus: false,
    enabled: false
  }
);

export const useDeleteAdjustment = (historicalPathParams: any, adjustment: any) => useQuery<any, any>(
  ['Delete Adjustment'],
  () => wfm.forecasting.api.delete_tenants_tenant_forecasttimeline_forecast_timeline_adjustments_adjustment({
    pathParams: {
      tenant_id: historicalPathParams.tenant_id,
      forecast_timeline_id: "eb195977-9ae0-44ae-bb7c-12af2a4975d3",
      adjustment_id: adjustment.adjustmentId
    }
  }),
  {
    refetchOnWindowFocus: false,
    enabled: false
  }
);

// const { data: newAdjustment } = useQuery<any, any>(
//   ['newAdjustment', adjustment],
//   () => {
//     const { adjustmentOperation, adjustmentId, timestamp, value } = adjustment;
//     let adjustmentStartDate = DateTime.fromISO(timestamp), adjustmentEndDate;
//     if (intervalType === 'quarter-hour') { //Interval = day
//       adjustmentEndDate = adjustmentStartDate.plus({ minutes: 14, seconds: 59 });
//     } else if (intervalType === 'hour') {  //Interval = twoDays
//       adjustmentEndDate = adjustmentStartDate.plus({ minutes: 59, seconds: 59 });
//     } else {  //Interval = week || dateRange
//       adjustmentEndDate = adjustmentStartDate.plus({ hours: 23, minutes: 59, seconds: 59 });
//     }
//     if (adjustmentOperation === 'post' && value !== '') {
//       return wfm.forecasting.api.post_tenants_tenant_forecasttimeline_forecast_timeline_adjustments({
//         pathParams: {
//           tenant_id: historicalPathParams.tenant_id, forecast_timeline_id: "94a42382-725f-48eb-8880-533cae2e1854"
//         },
//         body: {
//           startDateTime: adjustmentStartDate.toISO({ suppressMilliseconds: true, includeOffset: false }),
//           endDateTime: adjustmentEndDate.toISO({ suppressMilliseconds: true, includeOffset: false }),
//           intervalLength: intervalType,
//           competency: selectedCompetence,
//           channel: 'voice',
//           direction: 'inbound',
//           numberOfIntervals: 1,
//           type: 'percentage',
//           value: value
//         }
//       })
//     } else if (adjustmentOperation === 'update') {
//       return wfm.forecasting.api.patch_tenants_tenant_forecasttimeline_forecast_timeline_adjustments_adjustment_patch({
//         pathParams: {
//           tenant_id: historicalPathParams.tenant_id, forecast_timeline_id: "94a42382-725f-48eb-8880-533cae2e1854", adjustment_id: adjustmentId
//         },
//         body: {
//           startDateTime: adjustmentStartDate.toISO({ suppressMilliseconds: true, includeOffset: false }),
//           endDateTime: adjustmentEndDate.toISO({ suppressMilliseconds: true, includeOffset: false }),
//           intervalLength: intervalType,
//           competency: selectedCompetence,
//           channel: 'voice',
//           direction: 'inbound',
//           numberOfIntervals: 1,
//           type: 'percentage',
//           value: value
//         }
//       });
//     } else if (adjustmentOperation === 'delete' && adjustmentId) {
//       return wfm.forecasting.api.delete_tenants_tenant_forecasttimeline_forecast_timeline_adjustments_adjustment({
//         pathParams: {
//           tenant_id: historicalPathParams.tenant_id, forecast_timeline_id: "94a42382-725f-48eb-8880-533cae2e1854", adjustment_id: adjustmentId
//         }
//       });
//     }
//   },
//   {
//     refetchOnWindowFocus: false
//   }
// );