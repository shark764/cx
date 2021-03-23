import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  startDate: '',
  endDate: '',
  competence: '',
  timezone: '',
};

export const planning = createSlice({
  name: 'planning',
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
