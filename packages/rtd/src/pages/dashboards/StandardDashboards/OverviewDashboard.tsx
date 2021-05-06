import { log } from '@cx/utilities';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { MainState } from 'redux/reducers/main';

export function OverviewDashboard() {
  const filters = useSelector(
    (state: { main: MainState }) => state.main.filters,
  );
  log('info', 'filters updated', filters);

  return <div>OverviewDashboard</div>;
}
