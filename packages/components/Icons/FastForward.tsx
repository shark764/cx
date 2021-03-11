import * as React from 'react';
import { IIcon } from '@cx/types/icon';
import { IconContainer } from './IconContainer';

export function FastForward({
  onClick,
  size = 25,
  fill = 'grey',
  className,
  disabled = false,
}: IIcon): React.ReactElement {
  return (
    <IconContainer className={className} onClick={onClick} disabled={disabled}>
      <svg enableBackground="new 0 0 192.689 192.689" viewBox="0 0 192.689 192.689" width={size} fill={fill}>
        <g>
          <path d="M188.527 87.755l-83.009-84.2a11.952 11.952 0 00-17.011 0c-4.704 4.74-4.704 12.439 0 17.179l74.54 75.61-74.54 75.61c-4.704 4.74-4.704 12.439 0 17.179 4.704 4.74 12.319 4.74 17.011 0l82.997-84.2c4.535-4.558 4.547-12.606.012-17.178z" />
          <path d="M104.315 87.755l-82.997-84.2c-4.704-4.74-12.319-4.74-17.011 0-4.704 4.74-4.704 12.439 0 17.179l74.528 75.61-74.54 75.61c-4.704 4.74-4.704 12.439 0 17.179s12.319 4.74 17.011 0l82.997-84.2c4.535-4.558 4.547-12.606.012-17.178z" />
        </g>
      </svg>
    </IconContainer>
  );
}
