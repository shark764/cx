import { wfm } from '../../api';
import { useQuery } from 'react-query';
import { DateTime } from 'luxon';

export const useTimelineAdjustments = (tenant_id: string, historicalQueryParams: any, selectedTimeline: string) => useQuery<any, any>(
  ['Timeline Adjustments', tenant_id, selectedTimeline],
  () => {
    if (!tenant_id || !selectedTimeline) {
      return;
    }
    const allAdjustmentStartDate = DateTime.fromISO(historicalQueryParams.startDateTime)
      .startOf('day').toISO({ includeOffset: true });

    const allAdjustmentEndDate = DateTime.fromISO(historicalQueryParams.endDateTime)
      .endOf('day').toISO({ includeOffset: true });

    return wfm.forecasting.api.get_all_tenants_tenant_id_wfm_forecasttimeline_forecast_timeline_id_adjustments({
      pathParams: {
        tenant_id, forecast_timeline_id: selectedTimeline
      },
      queryString: {
        channels: ['voice', 'messaging', 'sms', 'email', 'work_item'],
        directions: ['inbound'],
        startDateTime: allAdjustmentStartDate,
        endDateTime: allAdjustmentEndDate
      }
    })
  },
  {
    refetchOnWindowFocus: false,
  }
);

export const useUpdateAdjustment = (tenant_id: string, adjustment: any, viewBy: string, selectedCompetence: string, selectedTimeline: string) => useQuery<any, any>(
  ['Update Adjustment'],
  () => wfm.forecasting.api.patch_tenants_tenant_forecasttimeline_forecast_timeline_adjustments_adjustment_patch({
    pathParams: {
      tenant_id,
      forecast_timeline_id: selectedTimeline,
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

export const useDeleteAdjustment = (tenant_id: string, adjustment: any, selectedTimeline: string) => useQuery<any, any>(
  ['Delete Adjustment'],
  () => wfm.forecasting.api.delete_tenants_tenant_forecasttimeline_forecast_timeline_adjustments_adjustment({
    pathParams: {
      tenant_id,
      forecast_timeline_id: selectedTimeline,
      adjustment_id: adjustment.adjustmentId
    }
  }),
  {
    refetchOnWindowFocus: false,
    enabled: false
  }
);
