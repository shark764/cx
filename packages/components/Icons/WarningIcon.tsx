import * as React from 'react';
import { BasicIconProps } from '@cx/types/icon';

export const WarningIcon: React.FC<BasicIconProps> = ({ size = '30', fill = 'rgb(241, 113, 0)' }) => (
  <svg viewBox="0 0 100 100" width={`${size}px`}>
    <path d="M50 0 L55 60 L70 60 L75 0 " fill={fill} />
    <circle cx="62" cy="80" r="10" fill={fill} />
  </svg>
);
