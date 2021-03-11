import { fetchTheme } from '@cx/fakedata/theme';
import { main } from './reducers/main';
import { planning } from './reducers/planning';
const { setTimeSpan } = planning.actions;
const { setTheme } = main.actions;

export function loadTheme() {
  return async (dispatch: any) => {
    const { data }: any = await fetchTheme();

    dispatch(setTheme(data));
  };
}


export const configureTimeSpan = (timeSpan: string) =>
  (dispatch: any) => {
    dispatch(setTimeSpan(timeSpan));
  };
