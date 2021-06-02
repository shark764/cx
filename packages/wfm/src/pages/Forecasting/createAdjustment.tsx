import { wfm } from '../../api';
import { DateTime } from 'luxon';
import { operations, components } from '@cx/cxapi/forecast-schema';

type Error = components["schemas"]["HTTPValidationError"]; // 422 res code

type NewAdjustment = components["schemas"]["ForecastAdjustmentDTO"];
type NewAdjustmentRequestObject = components["schemas"]["NewForecastAdjustmentDTO"];
type IntervalLength = components["schemas"]["IntervalType"];
type NewAdjustmentPathParams = operations["post_tenants_tenant_id_wfm_forecasttimeline_forecast_timeline_id_adjustments"]["parameters"]["path"];
interface NewAdjustmentRequest {
  pathParams: NewAdjustmentPathParams;
  body: NewAdjustmentRequestObject;
};


const parseDate = (timestamp: string): DateTime => DateTime.fromISO(timestamp);
const adjustmentDateFormat = (date: DateTime): string => date.toISO({ suppressMilliseconds: true, includeOffset: true });

const adjustmentStartDate = (date: string) => adjustmentDateFormat(parseDate(date));

export const createAdjustment = (tenant_id: string, forecast_timeline_id: string, intervalLength: IntervalLength, selectedCompetence: string) => (adjustment: any) => {

  const newAdjustmentRequest: NewAdjustmentRequest = {
    pathParams: {
      tenant_id, forecast_timeline_id,
    },
    body: {
      startDateTime: adjustmentStartDate(adjustment.timestamp),
      intervalLength: intervalLength,
      competency: selectedCompetence,
      channel: 'voice',
      direction: 'inbound',
      numberOfIntervals: 1,
      type: 'absolute',
      value: adjustment.value,
      metric: adjustment.metric
    }
  };

  return wfm.forecasting.api.post_tenants_tenant_id_wfm_forecasttimeline_forecast_timeline_id_adjustments(newAdjustmentRequest) as NewAdjustment | Error;
}
