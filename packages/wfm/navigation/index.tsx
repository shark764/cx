import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NoMatch } from './noMatch';

import Availability from '../pages/scheduling/Agent/Availability';
import Messages from '../pages/scheduling/Agent/Messages';
import Request from '../pages/scheduling/Agent/Request';
import AgentSchedule from '../pages/scheduling/Agent/Schedule';
import Trade from '../pages/scheduling/Agent/Trade';
import Organization from '../pages/scheduling/Admin/Organization';
import ActivityManagement from '../pages/scheduling/Admin/ActivityManagement';
import CompetenceManagement from '../pages/scheduling/Admin/CompetenceManagement';
import DayTypes from '../pages/scheduling/Admin/DayTypes';
import DefaultRestriction from '../pages/scheduling/Admin/DefaultRestriction';
import PlanningSchedule from '../pages/scheduling/Planning/Schedule';
import Employees from '../pages/scheduling/Planning/Employees';
import Settings from '../pages/scheduling/Planning/Settings';

import Forecasting from '../pages/forecasting';

export function Navigation() {
  return (
    <Switch>
      <Route exact path="/">
        <div />
      </Route>

      {/* PLANNING */ }
      <Route exact path={ [ '/planning', '/planning/schedule' ] }>
        <PlanningSchedule />
      </Route>
      <Route path="/planning/employees">
        <Employees />
      </Route>
      <Route path="/planning/settings">
        <Settings />
      </Route>

      {/* AGENT */ }
      <Route exact path={ [ '/agent', '/agent/schedule' ] }>
        <AgentSchedule />
      </Route>
      <Route path="/agent/availability">
        <Availability />
      </Route>
      <Route path="/agent/request">
        <Request />
      </Route>
      <Route path="/agent/trade">
        <Trade />
      </Route>
      <Route path="/agent/messages">
        <Messages />
      </Route>

      {/* FORECASTING */ }
      <Route exact path="/forecasting">
        <Forecasting />
      </Route>

      {/* ADMIN */ }
      <Route exact path={ [ '/admin', '/admin/organization' ] }>
        <Organization />
      </Route>
      <Route path="/admin/activity-management">
        <ActivityManagement />
      </Route>
      <Route path="/admin/competence-management">
        <CompetenceManagement />
      </Route>
      <Route path="/admin/day-types">
        <DayTypes />
      </Route>
      <Route path="/admin/default-restriction">
        <DefaultRestriction />
      </Route>

      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
