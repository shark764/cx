import * as React from 'react';
import { ReportingDashboards } from 'pages/ReportingDashboards';
import { Route, Switch } from 'react-router-dom';

import { NoMatch } from './NoMatch';

export function Navigation() {
  return (
    <Switch>
      {/* Reporting Dashboards - Standard / Custom */}
      <Route
        exact
        path={[
          '/',
          '/standard',
          '/standard/:dashboard',
          // '/standard/overview-dashboard',
          // '/standard/interactions-dashboard',
          // '/standard/queues-dashboard',
          // '/standard/resources-dashboard',
          // '/standard/agent-details-dashboard',
          // '/standard/agent-state-dashboard',
          // '/standard/interactions-completed-dashboard',
          // '/standard/interactions-in-conversation-dashboard',
          // '/standard/interactions-in-routing-dashboard',
          // '/standard/interactions-in-queue-dashboard',
          // '/standard/queue-details-dashboard',
          '/custom/:id',
        ]}
      >
        <ReportingDashboards />
      </Route>

      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
