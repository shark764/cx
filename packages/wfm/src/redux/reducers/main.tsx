import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  session: {
    tenant_id: null,
  },
  theme: null,
  displaySize: 720,
  competencies: [],
};

export const main = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setCompetencies: (state, action) => {
      state.competencies = action.payload;
    },
    setSessionData: (state, action) => {
      state.session = action.payload;
    },
  },
});
