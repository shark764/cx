import * as React from 'react';
import { IThemed } from '.';

export interface IContainer {
  size?: number;
  disabled?: boolean;
}

export interface IIcon extends IContainer {
  fill?: string;
  onClick?(event?: React.MouseEvent): void;
  title?: string;
  className?: string;
  rotate?: number;
}

export interface IPath extends IThemed {
  fillColor?: string;
}

export interface DirectionalIcon extends IIcon {
  direction?: 'right' | 'left';
}
