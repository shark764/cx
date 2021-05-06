import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: 'example',
};

export const main = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});
