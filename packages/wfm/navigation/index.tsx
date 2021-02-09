import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Admin from '../Scheduling/containers/Admin';
// import Availability from '../Scheduling/containers/Agent/Availability';
// import Messages from '../Scheduling/containers/Agent/Messages';
// import Request from '../Scheduling/containers/Agent/Request';
// import Schedule from '../Scheduling/containers/Agent/Schedule';
// import Trade from '../Scheduling/containers/Agent/Trade';
// import Forecasting from '../Forecasting';
// import Scheduling from '../Scheduling/containers/Scheduling';
import { NoMatch } from './noMatch';

export function Navigation () {
  return (
    <Switch>
      <Route exact path="/">
        <div />
      </Route>
      <Route exact path={ [ '/agent', '/agent/schedule' ] }>
        <div>schedule</div>
      </Route>
      <Route path="/agent/availability">
        <div>availability</div>
      </Route>
      <Route path="/agent/request">
        <div>request</div>
      </Route>
      <Route path="/agent/trade">
        <div>trade</div>
      </Route>
      <Route path="/agent/messages">
        <div>messages</div>
      </Route>

      <Route path="/scheduling">
        <div>sheduling</div>
      </Route>
      <Route path="/forecasting">
        <div>forcasting</div>
      </Route>
      <Route path="/admin">
        <div>admin</div>
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default Navigation;
