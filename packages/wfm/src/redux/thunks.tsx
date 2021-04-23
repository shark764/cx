import { fetchTheme } from '@cx/fakedata/theme';
import { main } from './reducers/main';
import { planning } from './reducers/planning';
import { forecasting } from './reducers/forecasting';
import { wfm } from '../api';
import { store } from '../redux/store';

const {
  setTimezone,
  setCompetence,
} = planning.actions;
const {
  setTheme,
  setCompetencies,
} = main.actions;
const {
  setCompetence: setForecastingDefaultCompetence,
  setScenarios,
  setScenarioInProgress,
} = forecasting.actions;

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
    // Set all global known competencies
    dispatch(setCompetencies(data));
    // Set the default selected competence for forecasting filters
    // for now we can just choose the first one in the list
    const defaultCompetence = data[0]?.id;
    dispatch(setForecastingDefaultCompetence(defaultCompetence));
  };
}

export const fetchForecastScenarios = (selectedTimeline: any) => {
  return async (dispatch: any, getState: any) => {
    const { forecasting: { historicalPathParams: { tenant_id } } } = getState();
    const { data } = await wfm.forecasting.api.get_timeline_scenarios_tenants_tenant_forecasttimelines_forecast_timeline_scenarios({
      pathParams: { tenant_id: tenant_id, forecast_timeline_id: selectedTimeline.id },
    });
    dispatch(setScenarios(data));
  };
}

export const timezone = (timeSpan: string) => (dispatch: any) => {
  dispatch(setTimezone(timeSpan));
};

export const competence = (timeSpan: string) => (dispatch: any) => {
  dispatch(setCompetence(timeSpan));
};

export const createForecastApi = async (formData: any, tenant_id: string, forecast_timeline_id: string) => {

    const {
      name,
      description,
      forecastRange,
      scenarioType,

      distribution_weight,
      activate_filter,
      growth,
      algorithmOptions,
      ...scenarioConfig
    } = formData;
    const { startDate, endDate } = forecastRange[0];

    const formattedAlgorithmOptions = [
      ...algorithmOptions,
      {option: 'distribution_weight', value: distribution_weight},
      {option: 'activate_filter', value: Boolean(activate_filter)},
      {option: 'growth', value: JSON.stringify(growth)},
    ];

    const allChannels = [
      'voice',
      // 'messaging',
      // 'sms',
      // 'email',
      // 'work_item'
    ];
    const currentCompetencies = [
      // Currently this is the users selected competence
      store.getState()?.forecasting?.competence
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
     * Save the scenario id in state so we can track its completion status
     */
    store.dispatch(setScenarioInProgress({ startDate, endDate, forecast_scenario_id }));

    /**
     * Then update the forecasts scenarios settings
     */
    await wfm.forecasting.api.put_params_tenants_tenant_forecastscenarios_forecast_scenario_params({
      pathParams: { tenant_id, forecast_scenario_id },
      body: {
        ...scenarioConfig,
        series,
        dayCurveDateRange: scenarioConfig.dayCurveDateRange[0],
        algorithmOptions: formattedAlgorithmOptions,
      },
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

};

export const deleteForecastScenario = async (formData: any, tenant_id: string, forecast_timeline_id: string) => {
  await wfm.forecasting.api.delete_forecast_timeline_scenario_tenants_tenant_forecasttimelines_forecast_timeline_scenarios({
    pathParams: { tenant_id, forecast_timeline_id },
    queryString: { ...formData }
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