import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

const formatDate = (date: any) => DateTime.fromJSDate(date).toFormat('yyyy-LL-dd');
const today = formatDate(new Date());

const initialState = {
  competence: '',
  scenarios: [],
  timezone: '',
  historicalPathParams: {
    // stagepool1 tenant on staging
    tenant_id: 'd676b68b-2f1c-498c-b6b3-db7e3a3e5708',
  },
  historicalQueryParams: {
    channel: 'voice',
    direction: 'inbound',
    startDateTime: today,
    endDateTime: today,
  },
  scenarioInProgress: {
    startDate: '',
    endDate: '',
    forecast_scenario_id: ''
  },
};

export const forecasting = createSlice({
  name: 'forecasting',
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.historicalQueryParams.startDateTime = action.payload;
    },
    setEndDate: (state, action) => {
      state.historicalQueryParams.endDateTime = action.payload;
    },
    setCompetence: (state, action) => {
      state.competence = action.payload;
    },
    setScenarios: (state, action) => {
      state.scenarios = action.payload;
    },
    setTimezone: (state, action) => {
      state.timezone = action.payload;
    },
    setScenarioInProgress: (state, action) => {
      state.scenarioInProgress = action.payload;
    },
  },
});
