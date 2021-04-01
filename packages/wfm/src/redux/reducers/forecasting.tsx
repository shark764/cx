import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  competence: '',
  timezone: '',
  historicalPathParams: {
    // stagepool1 tenant on staging
    tenant_id: 'd676b68b-2f1c-498c-b6b3-db7e3a3e5708',
    competency_id: '64e27f30-7dd9-11e7-9441-d379301ec11d'
  },
  historicalQueryParams: {
    channel: 'voice',
    direction: 'inbound',
    startDateTime: '2021-01-01T14:00:00Z',
    endDateTime: '2021-01-30T00:00:00Z',
  }
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
    setTimezone: (state, action) => {
      state.timezone = action.payload;
    },
  },
});
