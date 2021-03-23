import { fetchTheme } from '@cx/fakedata/theme';
import { main } from './reducers/main';
import { planning } from './reducers/planning';

const {
  setStartDate,
  setEndDate,
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

export const startDate = (timeSpan: string) => (dispatch: any) => {
  dispatch(setStartDate(timeSpan));
};

export const endDate = (timeSpan: string) => (dispatch: any) => {
  dispatch(setEndDate(timeSpan));
};

export const timezone = (timeSpan: string) => (dispatch: any) => {
  dispatch(setTimezone(timeSpan));
};

export const competence = (timeSpan: string) => (dispatch: any) => {
  dispatch(setCompetence(timeSpan));
};
