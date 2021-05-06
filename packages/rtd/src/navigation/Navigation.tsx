import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CustomDashboards } from '../pages/dashboards/CustomDashboards';
import { AgentDetailsTable } from '../pages/dashboards/StandardDashboards/AgentDetailsTable';
import { AgentStateTable } from '../pages/dashboards/StandardDashboards/AgentStateTable';
import { InteractionsCompletedTable } from '../pages/dashboards/StandardDashboards/InteractionsCompletedTable';
import { InteractionsDashboard } from '../pages/dashboards/StandardDashboards/InteractionsDashboard';
import { InteractionsInConversationTable } from '../pages/dashboards/StandardDashboards/InteractionsInConversationTable';
import { InteractionsInIVRTable } from '../pages/dashboards/StandardDashboards/InteractionsInIVRTable';
import { InteractionsInQueueTable } from '../pages/dashboards/StandardDashboards/InteractionsInQueueTable';
import { OverviewDashboard } from '../pages/dashboards/StandardDashboards/OverviewDashboard';
import { QueueDetailsTable } from '../pages/dashboards/StandardDashboards/QueueDetailsTable';
import { QueuesDashboard } from '../pages/dashboards/StandardDashboards/QueuesDashboard';
import { ResourcesDashboard } from '../pages/dashboards/StandardDashboards/ResourcesDashboard';

import { NoMatch } from './NoMatch';

export function Navigation() {
  return (
    <Switch>
      {/* Standard Dashboards */}
      <Route exact path={['/', '/standard', '/standard/overview-dashboard']}>
        <OverviewDashboard />
      </Route>
      <Route exact path="/standard/interactions-dashboard">
        <InteractionsDashboard />
      </Route>
      <Route exact path="/standard/queues-dashboard">
        <QueuesDashboard />
      </Route>
      <Route exact path="/standard/resources-dashboard">
        <ResourcesDashboard />
      </Route>
      <Route exact path="/standard/agent-details-dashboard">
        <AgentDetailsTable />
      </Route>
      <Route exact path="/standard/agent-state-dashboard">
        <AgentStateTable />
      </Route>
      <Route exact path="/standard/interactions-completed-dashboard">
        <InteractionsCompletedTable />
      </Route>
      <Route exact path="/standard/interactions-in-conversation-dashboard">
        <InteractionsInConversationTable />
      </Route>
      <Route exact path="/standard/interactions-in-routing-dashboard">
        <InteractionsInIVRTable />
      </Route>
      <Route exact path="/standard/interactions-in-queue-dashboard">
        <InteractionsInQueueTable />
      </Route>
      <Route exact path="/standard/queue-details-dashboard">
        <QueueDetailsTable />
      </Route>

      {/* Custom Dashboards */}
      <Route exact path={['/custom', '/custom/:id']}>
        <CustomDashboards />
      </Route>

      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
