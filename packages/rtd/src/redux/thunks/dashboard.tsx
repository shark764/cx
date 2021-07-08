import { GlobalFilters, WidgetData, WidgetFilters } from 'settings/types';
import { widgetFilterMap } from 'settings/settings';
import { main } from '../reducers/main';
import { dashboard } from '../reducers/dashboard';

const { updateWidgets } = main.actions;
const { setFilter, setFilters, setHiddenColumns } = dashboard.actions;

export function setWidgetsFilter(
  dashboardId: string,
  filter: string,
  value: string,
) {
  return async (dispatch: any, getState: any) => {
    dispatch(setFilter({ dashboard: dashboardId, filter, value }));
  };
}

export function setWidgetsFilters(dashboardId: string, filters: WidgetFilters) {
  return async (dispatch: any) => {
    dispatch(setFilters({ dashboard: dashboardId, filters }));
  };
}

/**
 * Ex.
 *  filter: 'source-switcher1', value: '0000'
 */
export function applyWidgetsFilter(
  dashboardId: string,
  filter: string,
  value: string,
) {
  return async (dispatch: any, getState: any) => {
    // Update filter values to keep
    // their selected values
    dispatch(setFilter({ dashboard: dashboardId, filter, value }));

    const globalFilters: GlobalFilters = getState().main.filters;
    const widgets: WidgetData[] = getState().main.dashboard?.widgets ?? [];

    const updatedWidgets: WidgetData[] = widgets.map((widget: WidgetData) => {
      if (widget.query) {
        /**
         * Ex.
         *  widgetParameters: {
         *    'queue-id': 'source-switcher1',
         *    'resourceId': '1000',
         *  }
         */
        const widgetParameters = widget.query.widgetParameters ?? {};
        const sourceSwitcherId = Object.keys(widgetParameters).find(
          (key) => widgetParameters[key] === filter,
        );
        if (!sourceSwitcherId) {
          // Widget is not being filtered by this source-switcher
          return widget;
        }

        const parameters = { ...widget.query.parameters };
        // Parameter can be configured in this form 'queue-id', or in 'queueId'
        const parameter = widgetFilterMap[sourceSwitcherId] ?? sourceSwitcherId;

        if (value === 'all') {
          delete parameters[parameter];
          if (parameter === 'group-id' && globalFilters['group-id'] !== 'all') {
            parameters[parameter] = globalFilters['group-id'];
            delete parameters.generalGroup;
          }
          if (parameter === 'skill-id' && globalFilters['skill-id'] !== 'all') {
            parameters[parameter] = globalFilters['skill-id'];
            delete parameters.generalSkill;
          }
        } else {
          parameters[parameter] = value;
          if (parameter === 'group-id') {
            delete parameters.generalGroup;
            if (
              globalFilters['group-id'] !== 'all'
              && globalFilters['group-id'] !== value
            ) {
              parameters.generalGroup = globalFilters['group-id'];
            }
          }
          if (parameter === 'skill-id') {
            delete parameters.generalSkill;
            if (
              globalFilters['skill-id'] !== 'all'
              && globalFilters['skill-id'] !== value
            ) {
              parameters.generalSkill = globalFilters['skill-id'];
            }
          }
        }

        return { ...widget, query: { ...widget.query, parameters } };
      }
      return widget;
    });

    dispatch(updateWidgets(updatedWidgets));
  };
}

export function setWidgetHiddenColumns(
  dashboardId: string,
  widgetId: string,
  columns: string[],
) {
  return async (dispatch: any, getState: any) => {
    // Update hidden columns to keep
    // their selected values
    dispatch(
      setHiddenColumns({ dashboard: dashboardId, widget: widgetId, columns }),
    );
  };
}
