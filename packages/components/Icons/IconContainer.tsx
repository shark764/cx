import * as React from 'react';
import styled from 'styled-components';
import { BasicIconProps } from '@cx/types/icon';

export const IconContainer = styled.div<BasicIconProps>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: ${({ size }) => size || 0}px;
  &:hover > svg > .icon {
    fill: darken(0.30, ${({ fill }) => fill});
  }
`;