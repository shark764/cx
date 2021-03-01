import * as React from 'react';
import { IThemed } from '.';

export interface IContainer {
  size?: number;
  disabled?: boolean;
}

export interface IFill extends IThemed {
  fill?: string;
}

export interface IIcon extends IContainer, IFill {
  onClick?(event?: React.MouseEvent): void;
  title?: string;
  className?: string;
}

export interface IPath extends IThemed {
  fillColor?: string;
}

export interface BasicIconProps {
  size: number;
  fill?: string;
  disabled?: boolean;
  className?: string;
  onClick?: any;
};

export interface DirectionalIcon extends BasicIconProps {
  direction?: 'right' | 'left';
};