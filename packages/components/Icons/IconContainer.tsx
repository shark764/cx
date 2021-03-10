import * as React from 'react';
import styled from 'styled-components';
import { IIcon } from '@cx/types/icon';

export const IconContainer = styled.div<IIcon>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'default')};
  width: ${({ size }) => size || 0}px;
`;
