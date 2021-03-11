import { main } from './main';
import { planning } from './planning';

export const reducer = {
  [main.name]: main.reducer,
  [planning.name]: planning.reducer,
};
