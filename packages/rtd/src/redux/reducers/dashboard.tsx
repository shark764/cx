import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  WidgetFilter,
  WidgetFilters,
  WidgetTableHiddenColumns,
} from 'settings/types';

export interface DashboardState {
  filters: {
    [key: string]: WidgetFilters;
  };
  hiddenColumns: {
    [key: string]: {
      [key: string]: string[];
    };
  };
}

const initialState: DashboardState = {
  // Ex.
  // filters: {
  //   'overview-dashboard': {
  //     'source-switcher1': '00000000-0000-0000-0000-000000000000',
  //   },
  // },
  filters: {},
  // Ex.
  // hiddenColumns: {
  //   'interactionsCompleted-dashboard': {
  //     'completedInteractionsList': ["interactionId"],
  //   },
  // },
  hiddenColumns: {},
};

export const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setFilter: (state: DashboardState, action: PayloadAction<WidgetFilter>) => {
      if (!state.filters[action.payload.dashboard]) {
        state.filters[action.payload.dashboard] = {
          [action.payload.filter]: action.payload.value,
        };
      } else {
        state.filters[action.payload.dashboard][action.payload.filter] = action.payload.value;
      }
    },
    setFilters: (
      state: DashboardState,
      action: PayloadAction<{ dashboard: string; filters: WidgetFilters }>,
    ) => {
      state.filters[action.payload.dashboard] = action.payload.filters;
    },
    setHiddenColumns: (
      state: DashboardState,
      action: PayloadAction<WidgetTableHiddenColumns>,
    ) => {
      if (!state.hiddenColumns[action.payload.dashboard]) {
        state.hiddenColumns[action.payload.dashboard] = {
          [action.payload.widget]: action.payload.columns,
        };
      } else {
        state.hiddenColumns[action.payload.dashboard][action.payload.widget] = action.payload.columns;
      }
    },
  },
});
