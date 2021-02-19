import { fetchTheme } from '@cx/fakedata/theme';
import { main } from './reducers/main';

const { setTheme } = main.actions;

export function loadTheme() {
  return async (dispatch: any) => {
    const { data }: any = await fetchTheme();

    dispatch(setTheme(data));
  };
}
