import * as React from 'react';
import { useLocation } from 'react-router';
import {
  generateDashboardQuery,
  getGridLayout,
  realtimeDashboardsSettings,
} from 'settings/settings';
import {
  DashboardRequest,
  DashboardSetting,
  WidgetData,
  WidgetGrid,
} from 'settings/types';
import { useDashboardPoll } from 'queries/generalQueries';
import { tempTenantId } from 'utils/consts';
import { WidgetLayout } from 'components/Widgets/WidgetLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDashboard } from 'redux/thunks/main';
import { MainState } from 'redux/reducers/main';

export function ReportingDashboards() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const [, , dashboardId] = pathname.split('/');
  const dashboardSettings: DashboardSetting = realtimeDashboardsSettings.dashboards[dashboardId];
  const dashboardWidgets: WidgetData[] = useSelector(
    (state: { main: MainState }) => state.main.dashboard?.widgets ?? [],
  );

  React.useEffect(() => {
    dispatch(setCurrentDashboard(dashboardSettings));
  }, [dashboardSettings, dispatch]);

  const { defaultSettings } = realtimeDashboardsSettings;
  const dashboardLayout: WidgetGrid[] = getGridLayout(dashboardWidgets);
  const gridLayout = {
    lg: dashboardLayout,
    md: dashboardLayout,
  };

  const pollRequest: DashboardRequest = React.useMemo(
    () => generateDashboardQuery(dashboardWidgets),
    [dashboardWidgets],
  );

  const dashboardPoll: any = useDashboardPoll(tempTenantId, pollRequest);

  return (
    <WidgetLayout
      settings={defaultSettings}
      layouts={gridLayout}
      widgets={dashboardWidgets}
      data={dashboardPoll?.data}
      loading={dashboardPoll.isLoading}
    />
  );
}
