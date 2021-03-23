import { main } from './main';
import { planning } from './planning';
import { forecasting } from './forecasting';

export const reducer = {
  [main.name]: main.reducer,
  [planning.name]: planning.reducer,
  [forecasting.name]: forecasting.reducer,
};
