import * as React from 'react';
import { IIcon } from '@cx/types/icon';
import { IconContainer } from './IconContainer';

export function Next({
  onClick, size = 25, fill = 'grey', className, disabled = false,
}: IIcon) {
  return (
    <IconContainer size={size} className={className} onClick={onClick} disabled={disabled} fill={fill}>
      <svg
        x="0"
        y="0"
        enableBackground="new 0 0 240.823 240.823"
        version="1.1"
        viewBox="0 0 240.823 240.823"
        xmlSpace="preserve"
      >
        <path
          d="M183.189 111.816L74.892 3.555c-4.752-4.74-12.451-4.74-17.215 0-4.752 4.74-4.752 12.439 0 17.179l99.707 99.671-99.695 99.671c-4.752 4.74-4.752 12.439 0 17.191 4.752 4.74 12.463 4.74 17.215 0l108.297-108.261c4.68-4.691 4.68-12.511-.012-17.19z"
          fill={fill}
        />
      </svg>
    </IconContainer>
  );
}
