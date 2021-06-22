import { ReportingDashboards } from 'pages/ReportingDashboards';
import { CustomDashboards } from 'pages/CustomDashboards';
import { Redirect, Route, Switch } from 'react-router-dom';

import { NoMatch } from './NoMatch';

export function Navigation() {
  return (
    <Switch>
      {/* Reporting Dashboards - Standard */}
      <Route
        exact
        path={[
          '/standard/overview-dashboard',
          '/standard/interactions-dashboard',
          '/standard/queues-dashboard',
          '/standard/resources-dashboard',
          '/standard/agent-details-dashboard',
          '/standard/agent-state-dashboard',
          '/standard/interactions-completed-dashboard',
          '/standard/interactions-in-conversation-dashboard',
          '/standard/interactions-in-routing-dashboard',
          '/standard/interactions-in-queue-dashboard',
          '/standard/queue-details-dashboard',
          // '/standard/:dashboard',
        ]}
      >
        <ReportingDashboards />
      </Route>
      <Redirect exact from="/" to="/standard/overview-dashboard" />
      <Redirect exact from="/standard" to="/standard/overview-dashboard" />

      {/* Reporting Dashboards - Custom */}
      <Route exact path="/custom/:id">
        <CustomDashboards />
      </Route>
      <Redirect exact from="/custom" to="/standard/overview-dashboard" />

      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
