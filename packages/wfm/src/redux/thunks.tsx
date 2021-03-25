import { fetchTheme } from '@cx/fakedata/theme';
import { main } from './reducers/main';
import { planning } from './reducers/planning';

const {
  setTimezone,
  setCompetence
} = planning.actions;
const { setTheme } = main.actions;

export function loadTheme() {
  return async (dispatch: any) => {
    const { data }: any = await fetchTheme();

    dispatch(setTheme(data));
  };
}

export const timezone = (timeSpan: string) => (dispatch: any) => {
  dispatch(setTimezone(timeSpan));
};

export const competence = (timeSpan: string) => (dispatch: any) => {
  dispatch(setCompetence(timeSpan));
};
