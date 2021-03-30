import { fetchTheme } from '@cx/fakedata/theme';
import { main } from './reducers/main';
import { planning } from './reducers/planning';
import { wfm } from '../api';

const {
  setTimezone,
  setCompetence
} = planning.actions;
const { setTheme } = main.actions;

export function loadTheme() {
  return async (dispatch: any) => {
    const { data }: any = await fetchTheme();

    dispatch(setTheme(data));
  };
}

export const timezone = (timeSpan: string) => (dispatch: any) => {
  dispatch(setTimezone(timeSpan));
};

export const competence = (timeSpan: string) => (dispatch: any) => {
  dispatch(setCompetence(timeSpan));
};


export const createForecastApi = async (formData: any, tenant_id: string, forecast_timeline_id: string) => {

  // TODO: automate this example in puppeteer
  // start feb 1-2
  //  day valu jan 20-26
  // day curev  jan 20 -26

  // detail: "There are no any historical day curve values for triplet: competency: 64e27f30-7dd9-11e7-9441-d379301ec11d, channel: voice, direction: inbound

    const { name, description, startDate, endDate, scenarioType, ...scenarioConfig } = formData;

    /**
    * First make a new forecast scenario and grab scenario ID off that for the next step
    */
    const { data: { id: forecast_scenario_id } } = await wfm.forecasting.api.post_tenants_tenant_forecastscenarios({
      pathParams: { tenant_id },
      body: { name, description, startDate, endDate, scenarioType },
    });

    /**
     * Then update the forecasts scenarios settings
     * TODO: dayCurveDateRange (dayCurveDateRange needs to be even weeks, but it does not matter on which day it starts):
     * TODO: don't include day curve date range when day curve was no provided?
     */
    await wfm.forecasting.api.put_params_tenants_tenant_forecastscenarios_forecast_scenario_params({
      pathParams: { tenant_id, forecast_scenario_id },
      body: scenarioConfig,
    });


    /**
     * Then generate (AKA initiate) the forecast
     * This step can take some time to complete    init_forecast_tenants_tenant_forecastscenarios_forecast_scenario_forecast
     */
    await wfm.forecasting.api.init_forecast_tenants_tenant_forecastscenarios_forecast_scenario_forecast({
      pathParams: { tenant_id, forecast_scenario_id },
    });

    /**
     * Then add your forecast scenario to a timeline
     */
    await wfm.forecasting.api.post_timeline_scenario_tenants_tenant_forecasttimelines_forecast_timeline_scenarios({
      pathParams: { tenant_id, forecast_timeline_id },
      body: {
        forecastScenarioId: forecast_scenario_id,
        startDate,
        endDate,
      }
    });

    /**
     * Validate the status of the forecast
     */
    await wfm.forecasting.api.get_all_tenants_tenant_forecastscenarios_scenario_series({
      pathParams: { tenant_id, scenario_id: forecast_scenario_id },
    });

  };


export const deleteForecastApi = (data: any) => {
  console.log('data', data)
};

export const createNewTimelineApi = async (body: any, tenant_id: string, onSuccess: any) => {
  wfm.forecasting.api.post_timelines_tenants_tenant_forecasttimelines({
    pathParams: {tenant_id},
    body: body
  })
  .then((data: any) => {
    onSuccess();
  });
};