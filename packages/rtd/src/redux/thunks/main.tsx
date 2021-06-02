import { DashboardSetting, FilterTypes, main } from '../reducers/main';

const { setDashboard, setFilter, setLeftPanelOpen } = main.actions;

export function setGlobalFilter(filter: FilterTypes, value: string) {
  return async (dispatch: any) => {
    dispatch(setFilter({ filter, value }));
  };
}

export function setIsLeftPanelOpen(isOpen: boolean) {
  return async (dispatch: any) => {
    dispatch(setLeftPanelOpen(isOpen));
  };
}

export function setCurrentDashboard(dashboard: DashboardSetting) {
  return async (dispatch: any) => {
    dispatch(setDashboard(dashboard));
  };
}
