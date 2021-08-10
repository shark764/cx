import { wfm } from '../../api';
import { DateTime } from 'luxon';
import { operations, components } from '@cx/cxapi/forecast-schema';

type Error = components["schemas"]["HTTPValidationError"]; // 422 res code

type UpdateAdjustment = components["schemas"]["ForecastAdjustmentDTO"];
type UpdateAdjustmentRequestObject = components["schemas"]["ForecastAdjustmentPatchDTO"];
type IntervalLength = components["schemas"]["IntervalType"];
type UpdateAdjustmentPathParams = operations["patch_tenants_tenant_id_wfm_forecasttimeline_forecast_timeline_id_adjustments_adjustment_id"]["parameters"]["path"];
interface NewAdjustmentRequest {
  pathParams: UpdateAdjustmentPathParams;
  body: UpdateAdjustmentRequestObject;
};


const parseDate = (timestamp: string): DateTime => DateTime.fromISO(timestamp);
const adjustmentDateFormat = (date: DateTime): string => date.toISO({ suppressMilliseconds: true, includeOffset: true });

const adjustmentStartDate = (date: string) => adjustmentDateFormat(parseDate(date));



export const updateAdjustment = (tenant_id: string, forecast_timeline_id: string, intervalLength: IntervalLength, selectedCompetence: string) => (adjustment: any) => {

  const newAdjustmentRequest: NewAdjustmentRequest = {
    pathParams: {
      tenant_id,
      forecast_timeline_id,
      adjustment_id: adjustment.adjustment_id,
    },
    body: {
      startDateTime: adjustmentStartDate(adjustment.timestamp),
      intervalLength: intervalLength,
      competency: selectedCompetence,
      channel: adjustment.channel,
      direction: 'inbound',
      numberOfIntervals: adjustment.intervals || 1,
      type: 'absolute',
      value: adjustment.value,
      // @ts-ignore   TODO: this works but doesn't match documentation
      metric: adjustment.metric
    }
  };

  return wfm.forecasting.api.patch_tenants_tenant_id_wfm_forecasttimeline_forecast_timeline_id_adjustments_adjustment_id(newAdjustmentRequest) as UpdateAdjustment | Error;
}
