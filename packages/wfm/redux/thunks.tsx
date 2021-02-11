import { fetchTheme } from './fake-apis';
import { main } from './reducers/main';

const { setTheme } = main.actions;

export function loadTheme() {
  return async (dispatch: any) => {
    const { data }: any = await fetchTheme();

    dispatch(setTheme(data));
  };
}
