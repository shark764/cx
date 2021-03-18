import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { reducer } from './reducers';

export interface RootState {
  main: {
    theme: any;
  };
  planning: {
    timeSpan: string;
  };
}

const middleware = [...getDefaultMiddleware()];

export const store = configureStore({
  reducer,
  middleware,
});
