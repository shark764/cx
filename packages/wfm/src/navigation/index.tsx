import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Employees } from '../pages/Scheduling/Planning/Employees';
import { PlanningSchedule } from '../pages/Scheduling/Planning/Schedule';
import { Settings } from '../pages/Scheduling/Planning/Settings';

import { AgentSchedule } from '../pages/Scheduling/Agent/Schedule';
import { Availability } from '../pages/Scheduling/Agent/Availability';
import { Messages } from '../pages/Scheduling/Agent/Messages';
import { Request } from '../pages/Scheduling/Agent/Request';
import { Trade } from '../pages/Scheduling/Agent/Trade';

import { Forecasting } from '../pages/Forecasting';

import { Organization } from '../pages/Scheduling/Admin/Organization';
import { ActivityManagement } from '../pages/Scheduling/Admin/ActivityManagement';
import { CompetenceManagement } from '../pages/Scheduling/Admin/CompetenceManagement';
import { DayTypes } from '../pages/Scheduling/Admin/DayTypes';
import { DefaultRestriction } from '../pages/Scheduling/Admin/DefaultRestriction';

import { NoMatch } from './NoMatch';

export function Navigation() {
  return (
    <Switch>
      <Route exact path="/">
        <div />
      </Route>

      {/* PLANNING */}
      <Route exact path={['/planning', '/planning/schedule']}>
        <PlanningSchedule />
      </Route>
      <Route path="/planning/employees">
        <Employees />
      </Route>
      <Route path="/planning/settings">
        <Settings />
      </Route>

      {/* AGENT */}
      <Route exact path={['/agent', '/agent/schedule']}>
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

      {/* FORECASTING */}
      <Route exact path="/forecasting">
        <Forecasting />
      </Route>

      {/* ADMIN */}
      <Route exact path={['/admin', '/admin/organization']}>
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
