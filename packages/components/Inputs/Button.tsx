import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { IButton } from '@cx/types/form';

const StyledButton = styled.button<IButton>`
  padding: 15px 35px;
  border-radius: 16px;
  color: ${({ color }) => color || 'initial'};

  ${({ disabled }) => disabled
    && css`
      cursor: not-allowed;
      opacity: 0.5;
    `}

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    outline: 0;
  }
`;

interface IButton2 extends IButton {
  children?: React.ReactNode;
  label?: string;
}
export function Button({ label, children, ...rest }: IButton2) {
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
