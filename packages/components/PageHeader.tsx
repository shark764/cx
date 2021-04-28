import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { withTheme, Theme } from "@material-ui/core/styles"

const Header = withTheme(styled('header')`
  display: grid;
  grid-template-areas: 'logo nav';
  height: 50px;
  background-color: ${({theme}: any) => {
    return theme.palette.primary.main;
    }};
  padding-left: 20px;
  padding-right: 20px;
`);
const Nav = styled.nav`
  grid-area: nav;
  display: grid;
  grid-template-columns: repeat(6, auto);
  align-items: center;
  justify-items: center;
`;
const StyledNavLink = withTheme(styled(NavLink)`
  text-decoration: none;
  color: ${({theme: { palette: { getContrastText, primary } }}) => getContrastText(primary.main) };

  &.active {
    color: grey;
  }

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`);

const links = [
  { label: 'Planning', to: '/planning' },
  { label: 'Forecasting', to: '/forecasting' },
  { label: 'Agent', to: '/agent' },
  { label: 'Admin', to: '/admin' },
];

export function PageHeader() {
  return (
    <Header>
      <Nav>
        {links.map((link) => (
          <StyledNavLink
            to={link.to}
            key={link.to}
            isActive={(match, location) => {
              if (!match) {
                return false;
              }
              return link.to === location.pathname;
            }}
          >
            <span>{link.label}</span>
          </StyledNavLink>
        ))}
      </Nav>
    </Header>
  );
}
