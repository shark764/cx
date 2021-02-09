import * as React from 'react';
import styled from 'styled-components';
import { useLocation, NavLink } from 'react-router-dom';
import { QuestionMark } from '../icons/questionMark';

const SideMenu = styled.main`
  margin-top: 50px;
`;

export function PageSideBar() {
  const { pathname } = useLocation();

  let header: any = {};
  let links: any[] = [];
  if ( pathname.startsWith( '/scheduling' ) ) {
    header = { label: 'SCHEDULING', to: '/scheduling' };
    // links = [
    //   { label: 'SCHEDULE', to: '/scheduling/schedule' },
    // ];
  } else if ( pathname.startsWith( '/forecasting' ) ) {
    header = { label: 'FORECASTING', to: '/forecasting' };
    // links = [
    //   { label: 'SCHEDULE', to: '/admin/schedule' },
    // ];
  } else if ( pathname.startsWith( '/agent' ) ) {
    header = { label: 'AGENT', to: '/agent' };
    links = [
      { label: 'SCHEDULE', to: '/agent/schedule' },
      { label: 'AVAILABILITY', to: '/agent/availability' },
      { label: 'REQUEST', to: '/agent/request' },
      { label: 'TRADE', to: '/agent/trade' },
      { label: 'MESSAGES', to: '/agent/messages' },
    ];
  } else if ( pathname.startsWith( '/admin' ) ) {
    header = { label: 'ADMIN', to: '/admin' };
    // links = [
    //   { label: 'SCHEDULE', to: '/admin/schedule' },
    // ];
  }

  if ( !links.length ) {
    return null;
  }

  return (
    <SideMenu>
      <NavLink
        to={ header.to }
        isActive={ ( match, location ) => {
          if ( !match ) {
            return false;
          }
          return header.to === location.pathname;
        } }
        className="menu-header"
      >
        <span>{ header.label }</span>
        {/* @ts-ignore */}
        <QuestionMark secondary onClick={ () => console.log( 'Question?' ) } title="Go to documentation" />
      </NavLink>

      {links.map( ( link ) => (
        <NavLink
          to={ link.to }
          key={ link.to }
          isActive={ ( match, location ) => {
            if ( !match ) {
              return false;
            }
            return link.to === location.pathname;
          } }
          className="menu-link"
        >
          <span>{ link.label }</span>
        </NavLink>
      ) ) }
    </SideMenu>
  );
}
