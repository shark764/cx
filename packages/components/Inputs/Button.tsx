import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ButtonProps } from '@cx/wfm/index.types';

const StyledButton = styled.button<ButtonProps>`
  padding: 15px 35px;
  border-radius: 16px;
  color: ${({ color }) => color || 'initial'};

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    outline: 0;
  }

  ${({
    bgColor, primary, secondary, theme,
  }) => (bgColor
      && css`
        background-color: ${bgColor};
        border-color: ${bgColor};
      `)
    || (primary
      && css`
        color: ${theme.colors['accent-3']};
        background-color: ${theme.colors.primary};
        border-color: ${theme.colors.primary};
      `)
    || (secondary
      && css`
        color: ${theme.colors['accent-3']};
        background-color: ${theme.colors.secondary};
        border-color: ${theme.colors.secondary};
      `)};
`;

interface IButton extends ButtonProps {
  children?: React.ReactNode;
  label?: string;
}
export function Button({ label, children, ...rest }: IButton) {
  return (
    <StyledButton {...rest}>
      {label}
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};
