import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timeSpan: 'day',
};

export const planning = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    setTimeSpan: (state, action) => {
      state.timeSpan = action.payload;
    },
  },
});
