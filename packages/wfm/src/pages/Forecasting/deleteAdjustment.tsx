import { wfm } from '../../api';
import { operations, components } from '@cx/cxapi/forecast-schema';

type Error = components["schemas"]["HTTPValidationError"]; // 422 res code
type DeleteAdjustmentPathParams = operations["delete_tenants_tenant_id_forecasttimeline_forecast_timeline_id_adjustments_adjustment_id"]["parameters"]["path"];
interface DeleteAdjustmentRequest {
  pathParams: DeleteAdjustmentPathParams;
};


export const deleteAdjustment = (tenant_id: string, forecast_timeline_id: string) => ({adjustment_id}: any) => {

  const deleteAdjustmentRequest: DeleteAdjustmentRequest = {
    pathParams: {
      tenant_id,
      forecast_timeline_id,
      adjustment_id,
    },
  };

  return wfm.forecasting.api.delete_tenants_tenant_id_forecasttimeline_forecast_timeline_id_adjustments_adjustment_id(deleteAdjustmentRequest) as any | Error;
}
