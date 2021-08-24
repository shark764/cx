import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { reducer } from './reducers';

export interface RootState {
  main: {
    theme: any;
    displaySize: number;
    competencies: any[];
    channels: any[];
    tableChannel: string;
    session: {
      tenant_id: string;
    };
  };
  planning: {
    startDate: string;
    endDate: string;
    timezone: string;
    competence: string;
    plan: {label: string; id: string};
  };
  forecasting: {
    competence: string;
    scenarios: any[];
    scenarioInProgress: {startDate: string, endDate: string, forecast_scenario_id: string};
    timezone: string;
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
