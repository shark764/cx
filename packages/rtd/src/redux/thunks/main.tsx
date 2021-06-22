import { DashboardSetting, FilterTypes, WidgetData } from 'settings/types';
import { main } from '../reducers/main';

const {
  setDashboard,
  setFilter,
  setLeftPanelOpen,
  updateWidgets,
} = main.actions;

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

export function applyGlobalFilter(filter: FilterTypes, value: string) {
  return async (dispatch: any, getState: any) => {
    dispatch(setFilter({ filter, value }));

    const widgets: WidgetData[] = getState().main.dashboard?.widgets ?? [];

    const updatedWidgets: WidgetData[] = widgets.map((widget: WidgetData) => {
      if (widget.query) {
        const parameters = { ...widget.query.parameters };
        if (value === 'all') {
          delete parameters[filter];
        } else {
          parameters[filter] = value;
        }
        return {
          ...widget,
          query: { ...widget.query, parameters },
        };
      }
      return widget;
    });

    dispatch(updateWidgets(updatedWidgets));
  };
}
