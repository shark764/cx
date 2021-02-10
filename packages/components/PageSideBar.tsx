import * as React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { QuestionMark } from './icons/QuestionMark';

const SideMenu = styled.main`
  margin-top: 50px;
`;

export function PageSideBar() {
  const { pathname } = useLocation();

  let header: any = {};
  let links: Array<any> = [];
  if (pathname.startsWith('/planning')) {
    header = { label: 'PLANNING', to: '/planning' };
    links = [
      { label: 'SCHEDULE', to: '/planning/schedule' },
      { label: 'EMPLOYEES', to: '/planning/employees' },
      { label: 'SETTINGS', to: '/planning/settings' },
    ];
  } else if (pathname.startsWith('/forecasting')) {
    header = { label: 'FORECASTING', to: '/forecasting' };
    // links = [
    //   { label: 'SCHEDULE', to: '/admin/schedule' },
    // ];
  } else if (pathname.startsWith('/agent')) {
    header = { label: 'AGENT', to: '/agent' };
    links = [
      { label: 'SCHEDULE', to: '/agent/schedule' },
      { label: 'AVAILABILITY', to: '/agent/availability' },
      { label: 'REQUEST', to: '/agent/request' },
      { label: 'TRADE', to: '/agent/trade' },
      { label: 'MESSAGES', to: '/agent/messages' },
    ];
  } else if (pathname.startsWith('/admin')) {
    header = { label: 'ADMIN', to: '/admin' };
    links = [
      { label: 'ORGANIZATION', to: '/admin/organization' },
      { label: 'ACTIVITY MANAGEMENT', to: '/admin/activity-management' },
      { label: 'COMPETENCE MANAGEMENT', to: '/admin/competence-management' },
      { label: 'DAY TYPES', to: '/admin/day-types' },
      { label: 'DEFAULT RESTRICTION', to: '/admin/default-restriction' },
    ];
  }

  if (!links.length) {
    return null;
  }

  return (
    <SideMenu>
      <NavLink
        to={header.to}
        isActive={(match, location) => {
          if (!match) {
            return false;
          }
          return header.to === location.pathname;
        }}
        className="menu-header"
      >
        <span>{header.label}</span>
        <QuestionMark
          secondary
          onClick={() => console.log('Question?')}
          title="Go to documentation"
        />
      </NavLink>

      {links.map((link) => (
        <NavLink
          to={link.to}
          key={link.to}
          isActive={(match, location) => {
            if (!match) {
              return false;
            }
            return link.to === location.pathname;
          }}
          className="menu-link"
        >
          <span>{link.label}</span>
        </NavLink>
      ))}
    </SideMenu>
  );
}
