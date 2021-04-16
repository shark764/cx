import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { reducer } from './reducers';

export interface RootState {
  main: {
    theme: any;
    displaySize: number;
    competencies: any[];
  };
  planning: {
    startDate: string;
    endDate: string;
    timezone: string;
    competence: string;
  };
  forecasting: {
    competence: '',
    scenarios: any[];
    timezone: '',
    historicalPathParams: {
      tenant_id: string;
      competency_id: string;
    },
    historicalQueryParams: {
      channel: string;
      direction: string;
      startDateTime: string;
      endDateTime: string;
    }
  }
}

const middleware = [...getDefaultMiddleware()];

export const store = configureStore({
  reducer,
  middleware,
});
