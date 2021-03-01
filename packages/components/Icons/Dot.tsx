import * as React from 'react';
import styled from 'styled-components';
import { BasicIconProps } from '@cx/types/icon';

const Circle = styled.span<BasicIconProps>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: 50%;
  display: block;
  background-color: ${({fill}) => fill || 'grey'};
`;

export const Dot:React.FC<BasicIconProps> = ({ size = 25, fill }) => (
  <Circle size={size} fill={fill}/>
)
