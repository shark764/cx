import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WidgetFilter, WidgetFilters } from 'settings/types';

export interface DashboardState {
  filters: WidgetFilters;
}

const initialState: DashboardState = {
  // Ex.
  // filters: {
  //   'source-switcher1': '00000000-0000-0000-0000-000000000000',
  // },
  filters: {},
};

export const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<WidgetFilter>) => {
      state.filters[action.payload.filter] = action.payload.value;
    },
    setFilters: (state, action: PayloadAction<WidgetFilters>) => {
      state.filters = action.payload;
    },
  },
});
