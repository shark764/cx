import { fetchTheme } from '@cx/fakedata/theme';
import { main } from './reducers/main';
import { planning } from './reducers/planning';
import { wfm } from '../api';
import { isConstructorDeclaration } from 'typescript';

const {
  setTimezone,
  setCompetence,
} = planning.actions;
const {
  setTheme,
  setCompetencies,
} = main.actions;

export function loadTheme() {
  return async (dispatch: any) => {
    const { data }: any = await fetchTheme();

    dispatch(setTheme(data));
  };
}

export const fetchTenantCompetencies = () => {
  return async (dispatch: any, getState: any) => {
    const { forecasting: { historicalPathParams: { tenant_id } } } = getState();
    const { data } = await wfm.planning.api.get_all_tenants_tenant_competencies({
      pathParams: { tenant_id },
    });

    dispatch(setCompetencies(data));
  };
}

export const timezone = (timeSpan: string) => (dispatch: any) => {
  dispatch(setTimezone(timeSpan));
};

export const competence = (timeSpan: string) => (dispatch: any) => {
  dispatch(setCompetence(timeSpan));
};

export const createForecastApi = async (formData: any, tenant_id: string, forecast_timeline_id: string) => {

    const { name, description, forecastRange, scenarioType, ...scenarioConfig } = formData;
    const { startDate, endDate } = forecastRange[0];

    const allChannels = [
      'voice',
      // 'messaging',
      // 'sms',
      // 'email',
      // 'work_item'
    ];
    const currentCompetencies = [
      '64e27f30-7dd9-11e7-9441-d379301ec11d', // temp_mock2
      // '65d62e00-7dd9-11e7-9441-d379301ec11d', // temp_mock
      // '66c3e960-7dd9-11e7-9441-d379301ec11d', // temp_mock3
    ];
    const series = currentCompetencies.flatMap((competency) => {
      return allChannels.map((channelType) => ({
        competency: competency,
        channel: channelType,
        direction: 'inbound',
      }))
    });

    /**
    * First make a new forecast scenario and grab scenario ID off that for the next step
    */
    const { data: { id: forecast_scenario_id } } = await wfm.forecasting.api.post_tenants_tenant_forecastscenarios({
      pathParams: { tenant_id },
      body: { name, description, startDate, endDate, scenarioType },
    });

    /**
     * Then update the forecasts scenarios settings
     * TODO: don't include day curve date range when day curve was not provided, or the toggle to select no was chosen?
     */
    await wfm.forecasting.api.put_params_tenants_tenant_forecastscenarios_forecast_scenario_params({
      pathParams: { tenant_id, forecast_scenario_id },
      body: {...scenarioConfig, series, dayCurveDateRange: scenarioConfig.dayCurveDateRange[0] },
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

export const deleteForecastScenario = async (formData: any) => {
  console.log('Form data', formData);
  // TODO: make this work yo
  const tenant_id = 'd676b68b-2f1c-498c-b6b3-db7e3a3e5708';
  const forecast_timeline_id = '1974e4dc-3d1e-4dd7-a7c2-16b6c75ce8a7';
  const scenario_id = '411672ae-0e4b-4271-9e1c-04bdc84ed69e';
  await wfm.forecasting.api.delete_forecast_timeline_scenario_tenants_tenant_forecasttimelines_forecast_timeline_scenarios({
    pathParams: { tenant_id, forecast_timeline_id },
    queryString: { forecastScenarioId: scenario_id }
  });
};

export const createNewTimelineApi = async (body: any, tenant_id: string, onSuccess: any) => {
  wfm.forecasting.api.post_timelines_tenants_tenant_forecasttimelines({
    pathParams: { tenant_id },
    body: body,
  })
  .then((data: any) => {
    onSuccess();
  });
};