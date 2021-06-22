import { WidgetFilters } from 'settings/types';
import { dashboard } from '../reducers/dashboard';

const { setFilter, setFilters } = dashboard.actions;

export function setWidgetsFilter(filter: string, value: string) {
  return async (dispatch: any) => {
    dispatch(setFilter({ filter, value }));
  };
}

export function setWidgetsFilters(filters: WidgetFilters) {
  return async (dispatch: any) => {
    dispatch(setFilters(filters));
  };
}
