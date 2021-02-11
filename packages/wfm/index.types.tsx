import * as React from 'react';

export interface Props {
  children: React.ReactNode;
}

export interface IconProps {
  onClick(event?: React.MouseEvent): void;
  title?: string;
  size?: number;
  fill?: string;
  primary?: boolean;
  secondary?: boolean;
  className?: string;
  disabled?: boolean;
}

export interface IEvent {
  start: Date;
  end: Date;
  desc?: string;
  title?: string;
  style?: any;
}

export interface ButtonProps {
  size?: number;
  disabled?: boolean;
  primary?: boolean;
  secondary?: boolean;
  color?: string;
  bgColor?: string;
}
