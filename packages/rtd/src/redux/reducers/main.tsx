import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DashboardSetting,
  GlobalFilter,
  GlobalFilters,
  WidgetData,
} from 'settings/types';

export interface MainState {
  filters: GlobalFilters;
  dashboard: DashboardSetting | null;
}

const initialState: MainState = {
  filters: {
    channelType: 'all',
    direction: 'all',
    'group-id': 'all',
    'skill-id': 'all',
  },
  dashboard: null,
};

export const main = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setFilter: (state: MainState, action: PayloadAction<GlobalFilter>) => {
      state.filters[action.payload.filter] = action.payload.value;
    },
    setDashboard: (
      state: MainState,
      action: PayloadAction<DashboardSetting>,
    ) => {
      state.dashboard = action.payload;
    },
    updateWidgets: (state: MainState, action: PayloadAction<WidgetData[]>) => {
      if (state.dashboard) {
        state.dashboard.widgets = action.payload;
      }
    },
  },
});
