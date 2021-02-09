import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { Props } from '../wfm/index.types';

const Container = styled.section`
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: ${({ theme }) => theme.colors.brand};
  position: fixed;
  height: 100%;
  overflow: auto;

  a {
    display: block;
    color: ${({ theme }) => theme.colors['accent-3']};
    padding: 48px 22px;
    text-decoration: none;

    &.menu-link {
      padding-left: 38px;

      &.active {
        border-top: 1px ${({ theme }) => theme.colors['accent-3']} solid;
        border-bottom: 1px ${({ theme }) => theme.colors['accent-3']} solid;
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors['accent-2']};
        font-weight: bolder;
        &:hover {
          background-color: ${({ theme }) => theme.colors.secondary};
        }
      }
      &:hover:not(.active) {
        background-color: ${({ theme }) => theme.colors['accent-1']};
      }
    }
  }
`;

export function SideBar({ children, ...rest }: Props) {
  return <Container {...rest}>{children}</Container>;
}

SideBar.propTypes = {
  children: PropTypes.node,
};
