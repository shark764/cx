import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

const formatDate = (date: any) => DateTime.fromJSDate(date).toFormat('yyyy-LL-dd');
const today = formatDate(new Date());
const initialState = {
  startDate: today,
  endDate: today,
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
