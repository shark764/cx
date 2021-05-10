import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

const formatDate = (date: any) => DateTime.fromJSDate(date).toFormat('yyyy-LL-dd');
const today = formatDate(new Date());

const initialState = {
  competence: '',
  scenarios: [],
  timezone: '',
  historicalPathParams: {
    // nickg tenant on qe
    tenant_id: 'd44f4620-34cb-11e7-b248-062913f854c1',
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
