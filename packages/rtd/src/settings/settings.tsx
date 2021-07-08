import { dashboardAgentDetails } from './dashboards/dashboardAgentDetails';
import { dashboardAgentState } from './dashboards/dashboardAgentState';
import { dashboardInteractions } from './dashboards/dashboardInteractions';
import { dashboardInteractionsCompleted } from './dashboards/dashboardInteractionsCompleted';
import { dashboardInteractionsInConversation } from './dashboards/dashboardInteractionsInConversation';
import { dashboardInteractionsInQueue } from './dashboards/dashboardInteractionsInQueue';
import { dashboardInteractionsInRouting } from './dashboards/dashboardInteractionsInRouting';
import { dashboardOverview } from './dashboards/dashboardOverview';
import { dashboardQueueDetails } from './dashboards/dashboardQueueDetails';
import { dashboardQueues } from './dashboards/dashboardQueues';
import { dashboardResources } from './dashboards/dashboardResources';
import {
  DashboardRequest,
  DashboardResponse,
  DashboardResults,
  DashboardSetting,
  WidgetData,
  WidgetGrid,
} from './types';

export interface RealtimeDashboardsSettings {
  dashboards: {
    [key: string]: DashboardSetting;
  };
  refreshRate: number;
  defaultSettings: { [key: string]: any };
}

export const realtimeDashboardsSettings: RealtimeDashboardsSettings = {
  dashboards: {
    'agent-details-dashboard': dashboardAgentDetails,
    'agent-state-dashboard': dashboardAgentState,
    'interactions-dashboard': dashboardInteractions,
    'interactions-completed-dashboard': dashboardInteractionsCompleted,
    'interactions-in-conversation-dashboard': dashboardInteractionsInConversation,
    'interactions-in-queue-dashboard': dashboardInteractionsInQueue,
    'interactions-in-routing-dashboard': dashboardInteractionsInRouting,
    'overview-dashboard': dashboardOverview,
    'queue-details-dashboard': dashboardQueueDetails,
    'queues-dashboard': dashboardQueues,
    'resources-dashboard': dashboardResources,
  },
  refreshRate: 3000,
  defaultSettings: {
    className: 'layout',
    isDraggable: false,
    isResizable: false,
    items: 50,
    rowHeight: 30,
    width: 1200,
    onLayoutChange() {},
    // This turns off compaction
    // so you can place items wherever.
    compactType: null,
    breakpoints: {
      lg: 1200,
      md: 996,
      sm: 768,
      xs: 480,
      xxs: 0,
    },
    cols: {
      lg: 40,
      md: 10,
      sm: 6,
      xs: 4,
      xxs: 2,
    },
    margins: [10, 10],
    containerPadding: [10, 10],
  },
};

export const getWidgets = (dashboard: DashboardSetting): WidgetData[] => dashboard.widgets;
export const getWidget = (
  widgets: WidgetData[],
  id: string,
): WidgetData | null => widgets?.find((widget: WidgetData) => widget.id === id) ?? null;

export const getDataGrid = (widget: WidgetData): WidgetGrid => ({
  i: widget.id,
  x: widget.col,
  w: widget.sizeX,
  minW: widget.minSizeX || 0,
  maxW: widget.maxSizeX || Infinity,
  y: widget.row,
  h: widget.sizeY,
  minH: widget.minSizeY || 0,
  maxH: widget.maxSizeY || Infinity,
  static: widget.static || false,
});
export const getGridLayout = (widgets: WidgetData[]): WidgetGrid[] => widgets.map(getDataGrid);

export const getWidgetPollData = (
  data: DashboardResponse,
  id: string,
): DashboardResults => (data || {})[id];

export const generateDashboardQuery = (
  widgets: WidgetData[],
): DashboardRequest => widgets?.reduce((formattedRequest: DashboardRequest, widget: WidgetData) => {
  if (widget.query) {
    formattedRequest[widget.id] = {
      ...widget.query.parameters,
      statistic: widget.statistic?.name || widget.query.endpoint,
    };
  }
  return formattedRequest;
}, {});

export const gaugeColorLevel = (widget: WidgetData, value: number): string => {
  const pattern: string[] = widget.presentation.gaugeConfig?.color?.pattern ?? [];
  const threshold: number[] = widget.presentation.gaugeConfig?.color?.threshold?.values ?? [];
  const index: number = threshold.findIndex((thValue: number) => (thValue === 100 ? value <= thValue : value < thValue));
  return index !== -1 ? pattern[index] : 'rgba(0,0,0,0.6)';
};

export interface WidgetFilterMap {
  [key: string]: string;
}
export const widgetFilterMap: WidgetFilterMap = {
  queueId: 'queue-id',
  resourceId: 'resource-id',
  skillId: 'skill-id',
  groupId: 'group-id',
};
