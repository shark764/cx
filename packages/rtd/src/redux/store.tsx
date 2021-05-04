import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { reducer } from './reducers';

const middleware = [
  ...getDefaultMiddleware(),
  // ... other middlewares
];

export const store = configureStore({
  reducer,
  middleware,
});
