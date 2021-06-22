import { main } from './main';
import { dashboard } from './dashboard';

export const reducer = {
  [main.name]: main.reducer,
  [dashboard.name]: dashboard.reducer,
};
