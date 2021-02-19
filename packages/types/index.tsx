import * as React from 'react';

export interface Props {
  children: React.ReactNode;
}

export interface IContainer {
  height?: string;
  width?: string;
}

export interface IThemed {
  primary?: boolean;
  secondary?: boolean;
  color?: string;
}
