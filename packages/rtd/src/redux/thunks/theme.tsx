import { main } from '../reducers/main';

const { setData } = main.actions;

export function loadData() {
  return async (dispatch: any) => {
    const data = 'random example';
    dispatch(setData(data));
  };
}
