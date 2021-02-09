import * as React from 'react';

export type Props = {
  children: React.ReactNode;
};

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
