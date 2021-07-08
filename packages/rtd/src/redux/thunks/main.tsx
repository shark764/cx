import {
  DashboardSetting,
  FilterTypes,
  WidgetData,
  WidgetFilters,
} from 'settings/types';
import { widgetFilterMap } from 'settings/settings';
import { main } from '../reducers/main';

const { setDashboard, setFilter, updateWidgets } = main.actions;

export function setGlobalFilter(filter: FilterTypes, value: string) {
  return async (dispatch: any) => {
    dispatch(setFilter({ filter, value }));
  };
}

export function setCurrentDashboard(dashboard: DashboardSetting) {
  return async (dispatch: any, getState: any) => {
    const globalFilters: Record<string, string> = getState().main.filters;
    const widgetFilters: WidgetFilters = getState().dashboard.filters[dashboard.id] ?? {};

    const globalFilterParameters = Object.keys(globalFilters).reduce(
      (filterParameters: Record<string, string>, filterKey: string) => {
        if (globalFilters[filterKey] !== 'all') {
          filterParameters[filterKey] = globalFilters[filterKey];
        }
        return filterParameters;
      },
      {},
    );

    const widgets: WidgetData[] = dashboard.widgets.map(
      (widget: WidgetData) => {
        if (widget.query && widget.query.parameters) {
          const widgetFilterParameters = Object.keys(
            widget.query.parameters,
          ).reduce(
            (filterParameters: Record<string, string>, filterKey: string) => {
              const parameter = widgetFilterMap[filterKey] ?? filterKey;
              const sourceSwitcherId = widget.query?.parameters[filterKey] ?? '';
              const sourceSwitcherValue = widgetFilters[sourceSwitcherId];
              if (sourceSwitcherValue && sourceSwitcherValue !== 'all') {
                filterParameters[parameter] = sourceSwitcherValue as string;
              }
              return filterParameters;
            },
            {},
          );

          /**
           * Skills and Groups can have values from the general filters
           * at the top, and from the source-switchers.
           * If both have values different from 'all', general ones have
           * to change to 'generalSkill' and 'generalGroup'
           */
          if (
            globalFilterParameters['group-id']
            && widgetFilterParameters['group-id']
            && globalFilterParameters['group-id']
              !== widgetFilterParameters['group-id']
          ) {
            globalFilterParameters.generalGroup = globalFilterParameters['group-id'];
            delete globalFilterParameters['group-id'];
          }
          if (
            globalFilterParameters['skill-id']
            && widgetFilterParameters['skill-id']
            && globalFilterParameters['skill-id']
              !== widgetFilterParameters['skill-id']
          ) {
            globalFilterParameters.generalSkill = globalFilterParameters['skill-id'];
            delete globalFilterParameters['skill-id'];
          }

          return {
            ...widget,
            query: {
              ...widget.query,
              parameters: {
                ...globalFilterParameters,
                ...widgetFilterParameters,
              },
              // widgetParameters will be used to keep query parameters
              // configuration after filters are updated.
              // parameters will keep the filter selected values
              // widgetParameters will keep which filters are configured
              // for the widget.
              widgetParameters: widget.query.parameters,
            },
          };
        }
        return widget;
      },
    );

    dispatch(setDashboard({ ...dashboard, widgets }));
  };
}

export function applyGlobalFilter(filter: FilterTypes, value: string) {
  return async (dispatch: any, getState: any) => {
    // Update filter values to keep their selected values
    dispatch(setFilter({ filter, value }));

    const dashboardId: string = getState().main.dashboard?.id ?? '';
    const widgetFilters: WidgetFilters = getState().dashboard.filters[dashboardId] ?? {};
    const widgets: WidgetData[] = getState().main.dashboard?.widgets ?? [];

    const updatedWidgets: WidgetData[] = widgets.map((widget: WidgetData) => {
      if (widget.query) {
        const parameters = { ...widget.query.parameters };
        if (value === 'all') {
          if (filter === 'group-id') {
            delete parameters.generalGroup;
          } else if (filter === 'skill-id') {
            delete parameters.generalSkill;
          }
          delete parameters[filter];
        } else {
          /**
           * Ex.
           *  widgetParameters: {
           *    'queue-id': 'source-switcher1',
           *    'resourceId': '1000',
           *  }
           */
          const widgetParameters = widget.query.widgetParameters ?? {};
          const wgGroupValue = widgetFilters[
            widgetParameters.groupId ?? widgetParameters['group-id'] ?? ''
          ];
          const wgSkillValue = widgetFilters[
            widgetParameters.skillId ?? widgetParameters['skill-id'] ?? ''
          ];

          if (
            filter === 'group-id'
            && wgGroupValue
            && wgGroupValue !== 'all'
            && wgGroupValue !== value
          ) {
            parameters.generalGroup = value;
          } else if (
            filter === 'skill-id'
            && wgSkillValue
            && wgSkillValue !== 'all'
            && wgSkillValue !== value
          ) {
            parameters.generalSkill = value;
          } else {
            if (filter === 'group-id') {
              delete parameters.generalGroup;
            } else if (filter === 'skill-id') {
              delete parameters.generalSkill;
            }
            parameters[filter] = value;
          }
        }
        return { ...widget, query: { ...widget.query, parameters } };
      }
      return widget;
    });

    dispatch(updateWidgets(updatedWidgets));
  };
}
