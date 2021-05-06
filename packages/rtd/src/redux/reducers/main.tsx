import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MainState {
  filters: {
    channel: string;
    direction: string;
    groups: string;
    skills: string;
  };
  leftPanelOpen: boolean;
}

export type FilterTypes = 'channel' | 'direction' | 'groups' | 'skills';
export interface GlobalFilter {
  filter: FilterTypes;
  value: string;
}

const initialState: MainState = {
  filters: {
    channel: 'all',
    direction: 'all',
    groups: 'all',
    skills: 'all',
  },
  leftPanelOpen: true,
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
  },
});
