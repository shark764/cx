import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
}
const StyledButton = styled.button<ButtonProps>`
  padding: 15px 35px;
  border-radius: 16px;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    outline: 0;
  }

  ${({ primary, secondary, theme }) =>
    (primary &&
      css`
        color: ${theme.colors['accent-3']};
        background-color: ${theme.colors.primary};
      `) ||
    (secondary &&
      css`
        color: ${theme.colors['accent-3']};
        background-color: ${theme.colors.secondary};
      `)};
`;

interface BtnProps {
  children?: React.ReactNode;
  label?: string;
}
export function Button({ label, children, ...rest }: BtnProps) {
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
