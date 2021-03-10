import * as React from 'react';
import styled from 'styled-components';
import { IIcon } from '@cx/types/icon';

const Circle = styled.span<IIcon>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: 50%;
  display: block;
  background-color: ${({ fill }) => fill || 'grey'};
`;

export const Dot: React.FC<IIcon> = ({ size = 25, fill, className }) => (
  <Circle size={size} fill={fill} className={className} />
);
