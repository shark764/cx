import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  display: grid;
  grid-template-areas: 'logo nav';
  height: 50px;
  background-color: ${( props ) => props.theme.colors.brand};
  padding-left: 20px;
  padding-right: 20px;
`;
const Nav = styled.nav`
  grid-area: nav;
  display: grid;
  grid-template-columns: repeat(6, auto);
  align-items: center;
  justify-items: center;
`;
const StyledNavLink = styled( NavLink )`
  text-decoration: none;
  color: ${( { theme } ) => theme.colors[ 'accent-3' ]};

  &.active {
    color: ${( { theme } ) => theme.colors[ 'accent-1' ]};
  }

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const links = [
  { label: 'SCHEDULING', to: '/scheduling' },
  { label: 'FORECASTING', to: '/forecasting' },
  { label: 'AGENT', to: '/agent' },
  { label: 'ADMIN', to: '/admin' },
];

export function PageHeader () {
  return (
    <Header>
      <Nav>
        { links.map( ( link ) => (
          <StyledNavLink
            to={ link.to }
            key={ link.to }
            isActive={ ( match, location ) => {
              if ( !match ) {
                return false;
              }
              return link.to === location.pathname;
            } }
          >
            <span>{ link.label }</span>
          </StyledNavLink>
        ) ) }
      </Nav>
    </Header>
  );
}
