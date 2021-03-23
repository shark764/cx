import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  startDate: '',
  endDate: '',
  competence: '',
  timezone: '',
  historicalPathParams: {
    tenant_id: '00000000-0000-0000-0000-000000000000',
    competency_id: '00000000-0000-0000-0000-000000000000',
  },
  historicalQueryParams: {
    channel: 'voice',
    direction: 'inbound',
    startDateTime: '2021-01-01T00:00:00Z', // TODO: converte these to date.now and the start / end of the date for timestamps
    endDateTime: '2021-01-30T00:00:00Z',
  }
};

export const forecasting = createSlice({
  name: 'forecasting',
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setCompetence: (state, action) => {
      state.competence = action.payload;
    },
    setTimezone: (state, action) => {
      state.timezone = action.payload;
    },
  },
});
