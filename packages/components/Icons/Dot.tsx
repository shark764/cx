import * as React from 'react';
import styled, { css } from 'styled-components';
import { IIcon } from '@cx/types/icon';

const Circle = styled.span<IIcon>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: 50%;
  display: block;
  ${({
    color, primary, secondary, theme,
  }) => (color
      && css`
        background-color: ${color};
      `)
    || (primary
      && css`
        background-color: ${theme.colors.primary};
      `)
    || (secondary
      && css`
        background-color: ${theme.colors.secondary};
      `)};
`;

export function Dot({
  size = 25, primary = false, secondary = false, ...rest
}: IIcon) {
  return <Circle size={size} primary={primary} secondary={secondary} {...rest} />;
}
