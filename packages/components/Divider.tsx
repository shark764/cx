import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

interface DividerProps {
  size?: number;
  color?: string;
  primary?: boolean;
  secondary?: boolean;
  direction?: string;
  className?: string;
}
export const VerticalDivider = styled.div<DividerProps>`
  border-radius: 6px;
  border-left: 2px solid;
  height: ${({ size }) => size}px;
  margin: 0 8px;
  line-height: 28px;

  ${({
    color, primary, secondary, theme,
  }) => (color
      && css`
        border-color: ${color};
      `)
    || (primary
      && css`
        border-color: ${theme.colors.primary};
      `)
    || (secondary
      && css`
        border-color: ${theme.colors.secondary};
      `)};
`;

export const HorizontalDivider = styled.hr<DividerProps>`
  border-radius: 6px;
  border-top: 2px solid;
  width: ${({ size }) => size}px;
  height: 0;
  margin: 10px 15px;

  ${({
    color, primary, secondary, theme,
  }) => (color
      && css`
        border-color: ${color};
      `)
    || (primary
      && css`
        border-color: ${theme.colors.primary};
      `)
    || (secondary
      && css`
        border-color: ${theme.colors.secondary};
      `)};
`;

export function Divider({ direction = 'vertical', ...rest }: DividerProps) {
  return direction === 'vertical' ? (
    <VerticalDivider {...rest} />
  ) : (
    <HorizontalDivider {...rest} />
  );
}

Divider.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
};
