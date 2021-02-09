import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: null,
};

export const main = createSlice( {
  name: 'main',
  initialState,
  reducers: {
    setTheme: ( state, action ) => {
      state.theme = action.payload;
    },
  },
} );
