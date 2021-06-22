import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DashboardSetting,
  GlobalFilter,
  GlobalFilters,
  WidgetData,
} from 'settings/types';

export interface MainState {
  filters: GlobalFilters;
  leftPanelOpen: boolean;
  dashboard: DashboardSetting | null;
}

const initialState: MainState = {
  filters: {
    channelType: 'all',
    direction: 'all',
    'group-id': 'all',
    'skill-id': 'all',
  },
  leftPanelOpen: true,
  dashboard: null,
};

export const main = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<GlobalFilter>) => {
      state.filters[action.payload.filter] = action.payload.value;
    },
    setLeftPanelOpen: (state, action) => {
      state.leftPanelOpen = action.payload;
    },
    setDashboard: (state, action) => {
      state.dashboard = action.payload;
    },
    updateWidgets: (state, action: PayloadAction<WidgetData[]>) => {
      if (state.dashboard) {
        state.dashboard.widgets = action.payload;
      }
    },
  },
});
