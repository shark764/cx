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
import { tempTenantId } from 'utils/consts';
import {
  useDashboardPoll,
  useFetchSingleDashboard,
} from 'queries/generalQueries';
import { WidgetLayout } from 'components/Widgets/WidgetLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDashboard } from 'redux/thunks/main';
import { MainState } from 'redux/reducers/main';

/**
 * TODO:
 * ReportingDashboards and CustomDashboards could be a single
 * component. We only need to stop query from polling until dashboard
 * metadata is retrieved.
 *  [branch CXV1-24362-bck] has a working example of this
 *    packages/rtd/src/pages/ReportingDashboards.tsx
 */
export function CustomDashboards() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const [, , dashboardId] = pathname.split('/');
  const dashboardResponse = useFetchSingleDashboard(tempTenantId, dashboardId);
  const dashboardMetadata = dashboardResponse?.data;
  const dashboardSettings: DashboardSetting | null = dashboardMetadata?.activeDashboard || null;
  const dashboardWidgets: WidgetData[] = useSelector(
    (state: { main: MainState }) => state.main.dashboard?.widgets ?? [],
  );

  React.useEffect(() => {
    dispatch(
      setCurrentDashboard({
        id: dashboardMetadata?.id ?? '',
        name: dashboardMetadata?.name ?? '',
        ...(dashboardSettings || { enabled: true, widgets: [] }),
      }),
    );
  }, [dashboardMetadata, dashboardSettings, dispatch]);

  const { defaultSettings } = realtimeDashboardsSettings;
  const dashboardLayout: WidgetGrid[] = getGridLayout(dashboardWidgets);
  const gridLayout = {
    lg: dashboardLayout,
    md: dashboardLayout,
  };

  /**
   * TODO:
   * Inprove this declaration, we need to use "pollRequest" to determine
   * whether the query must be executed or not.
   */
  const pollRequest: DashboardRequest | null = React.useMemo(
    () => (dashboardSettings ? generateDashboardQuery(dashboardWidgets) : null),
    [dashboardSettings, dashboardWidgets],
  );

  const dashboardPoll: any = useDashboardPoll(
    tempTenantId,
    pollRequest ?? {},
    !!pollRequest,
  );

  return (
    <WidgetLayout
      settings={defaultSettings}
      layouts={gridLayout}
      widgets={dashboardWidgets}
      data={dashboardPoll?.data}
      loading={dashboardPoll.isLoading}
      layoutLoading={dashboardResponse.isLoading}
    />
  );
}
