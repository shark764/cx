import { fetchTheme } from '@cx/fakedata/theme';
import { main } from './reducers/main';
import { planning } from './reducers/planning';
import { forecasting } from './reducers/forecasting';
import { wfm } from '../api';
import { store } from '../redux/store';
import { pastTwoYears } from '@cx/utilities/DateTime';

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
    const { main: { session: { tenant_id } } } = getState();
    const data = await wfm.planning.api.get_all_competencies_tenants_tenant_id_wfm_competencies({
      pathParams: { tenant_id },
    });
    // Filter out inactive competencies
    const filteredCompetencies = data.filter(({active}: any) => active);
    // Set all global known competencies
    dispatch(setCompetencies(filteredCompetencies));
    // Set the default selected competence for forecasting filters
    // for now we can just choose the first one in the list
    const defaultCompetence = filteredCompetencies[0]?.id;
    dispatch(setForecastingDefaultCompetence(defaultCompetence));
  };
}

export const fetchForecastScenarios = (selectedTimeline: any) => {
  return async (dispatch: any, getState: any) => {
    const { main: { session: { tenant_id } } } = getState();
    const data = await wfm.forecasting.api.get_timeline_scenarios_tenants_tenant_id_wfm_forecasttimelines_forecast_timeline_id_scenarios({
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
      country_holidays,

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
      {option: 'country_holidays', value: country_holidays?.value || ''},
    ];

    const allChannels = [
      'voice',
      'messaging',
      'sms',
      // 'email',
      // 'work-item'
    ];
    const currentCompetencies = [store.getState()?.main?.competencies?.[0]];

    const series = currentCompetencies.flatMap((competency: any) =>
      allChannels.map((channelType) => ({
        competency: competency?.id,
        channel: channelType,
        direction: 'inbound',
      }))
    );

    /**
     * dayValueDateRanges doesn't show up in the form object when All Historical is chosen
     * If all historical is chosen default "All historical" to the past 2 years
     */
    if (!formData.dayValueDateRanges) {
      scenarioConfig.dayValueDateRanges = [pastTwoYears()];
    }

    /**
    * First make a new forecast scenario and grab scenario ID off that for the next step
    */
    const { id: forecast_scenario_id } = await wfm.forecasting.api.post_tenants_tenant_id_wfm_forecastscenarios({
      pathParams: { tenant_id },
      body: { name, description, startDate: startDate.toISODate(), endDate: endDate.toISODate(), scenarioType },
    });

    /**
     * Save the scenario id in state so we can track its completion status
     */
    store.dispatch(setScenarioInProgress({ startDate, endDate, forecast_scenario_id }));

    /**
     * Then update the forecasts scenarios settings
     */
    const swapReverseDates = (dates: any) => {
      return dates?.map(({startDate, endDate}: any) => {
        const start = startDate.toISODate();
        const end = endDate.toISODate();
        if (start > end) {
          return { startDate: end, endDate: start }
        } else {
          return { startDate: start, endDate: end };
        }
      });
    };
    await wfm.forecasting.api.put_params_tenants_tenant_id_wfm_forecastscenarios_forecast_scenario_id_params({
      pathParams: { tenant_id, forecast_scenario_id },
      body: {
        ...scenarioConfig,
        series,
        dayCurveDateRange: swapReverseDates(scenarioConfig.dayCurveDateRanges)?.[0],
        algorithmOptions: formattedAlgorithmOptions,
      },
    });


    /**
     * Then generate (AKA initiate) the forecast
     * This step can take some time to complete
     */
    await wfm.forecasting.api.init_forecast_tenants_tenant_id_wfm_forecastscenarios_forecast_scenario_id_forecast({
      pathParams: { tenant_id, forecast_scenario_id },
    });

    /**
     * Then add your forecast scenario to a timeline
     */
    await wfm.forecasting.api.post_timeline_scenario_tenants_tenant_id_wfm_forecasttimelines_forecast_timeline_id_scenarios({
      pathParams: { tenant_id, forecast_timeline_id },
      body: {
        forecastScenarioId: forecast_scenario_id,
        startDate: startDate.toISODate(),
        endDate: endDate.toISODate(),
      }
    });

};

export const deleteForecastScenario = async (formData: any, tenant_id: string, forecast_timeline_id: string) => {
  await wfm.forecasting.api.delete_forecast_timeline_scenario_tenants_tenant_id_wfm_forecasttimelines_forecast_timeline_id_scenarios({
    pathParams: { tenant_id, forecast_timeline_id },
    queryString: { ...formData }
  });
};

export const createNewTimelineApi = async (body: any, tenant_id: string, onSuccess: any) => {
  wfm.forecasting.api.post_timelines_tenants_tenant_id_wfm_forecasttimelines({
    pathParams: { tenant_id },
    body: body,
  })
  .then((data: any) => {
    onSuccess();
  });
};