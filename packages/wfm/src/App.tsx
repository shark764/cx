import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { PageSideBar } from '@cx/components/PageSideBar';
import { useDivWidth } from '@cx/utilities/CustomHooks/useDivWidth';
import { fetchTenantCompetencies } from './redux/thunks';
import { main } from './redux/reducers/main';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { LinksArray } from '@cx/types';
import {
  AllInbox,
  AssignmentInd,
  AssignmentLate,
  CalendarToday,
  DesktopAccessDisabled,
  People,
  Public,
  Settings,
  Timeline,
} from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import { Navigation } from './navigation';
import { RootState } from './redux/store';

const {
  setSessionData
} = main.actions;

const Main = styled.main`
  margin: 0;
  overflow: auto;
`;

const Content = styled.section<{ isMobile: boolean }>`
  ${({ isMobile }) => (isMobile
    ? css`
          margin-left: 56px;
        `
    : css`
          padding: 24px;
          margin-left: 100px;
        `)}
`;

const linkMap: LinksArray = {
  planning: [
    { label: 'Schedule', to: '/planning/schedule', LinkIcon: CalendarToday },
    { label: 'Employees', to: '/planning/employees', LinkIcon: People },
    { label: 'Settings', to: '/planning/settings', LinkIcon: Settings },
  ],
  standard: [
    { label: 'Schedule', to: '/planning/schedule', LinkIcon: CalendarToday },
    { label: 'Employees', to: '/planning/employees', LinkIcon: People },
    { label: 'Settings', to: '/planning/settings', LinkIcon: Settings },
  ],
  forecasting: [
    { label: 'Forecast', to: '/forecasting', LinkIcon: Timeline },
    // { label: 'Settings', to: '/forecasting/settings', LinkIcon: Settings },
  ],
  agent: [
    { label: 'Schedule', to: '/agent/schedule', LinkIcon: CalendarToday },
    {
      label: 'Availability',
      to: '/agent/availability',
      LinkIcon: AssignmentLate,
    },
    /**
     * NOT REQUIRED FOR MVP
     */
    // { label: 'Request', to: '/agent/request', LinkIcon: Icon },
    // { label: 'Trade', to: '/agent/trade', LinkIcon: Icon },
    // { label: 'Messages', to: '/agent/messages', LinkIcon: Icon },
  ],
  admin: [
    { label: 'Organization', to: '/admin/organization', LinkIcon: AllInbox },
    {
      label: 'Activity Management',
      to: '/admin/activity-management',
      LinkIcon: AssignmentLate,
    },
    {
      label: 'Competence Management',
      to: '/admin/competence-management',
      LinkIcon: AssignmentInd,
    },
    { label: 'Day Types', to: '/admin/day-types', LinkIcon: Public },
    {
      label: 'Default Restriction',
      to: '/admin/default-restriction',
      LinkIcon: DesktopAccessDisabled,
    },
  ],
};

export function App({tenant_id}: any) {
  const displaySize = useSelector((state: RootState) => state.main.displaySize);
  const sessionTenantId = useSelector((state: RootState) => state.main.session.tenant_id);
  const [ref, width] = useDivWidth();
  const [isMobile, setIsMobile] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    width < displaySize ? setIsMobile(true) : setIsMobile(false);
  }, [width, displaySize]);

  useEffect(() => {
    if (sessionTenantId) {
      dispatch(fetchTenantCompetencies());
    }
  }, [dispatch, sessionTenantId]);

  useEffect(() => {
    dispatch(setSessionData({tenant_id: tenant_id}));
  }, [dispatch, tenant_id]);

  const route: string = useLocation().pathname.split('/')?.[1];
  const sideLinks = route && linkMap[route] ? linkMap[route] : [];

  return (
    <>
      <CssBaseline />

      <PageSideBar links={sideLinks} />

      <Main>
        <Content ref={ref} isMobile={isMobile}>
          <Navigation />
        </Content>
      </Main>

    </>
  );
}
