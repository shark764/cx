import * as React from 'react';
import { IIcon } from '@cx/types/icon';
import { IconContainer } from './IconContainer';

export const CloseIcon: React.FC<IIcon> = ({
  onClick,
  size = 25,
  fill = 'grey',
  className,
  disabled = false,
}): React.ReactElement => (
  <IconContainer className={className} onClick={onClick} disabled={disabled}>
    <svg viewBox="0 0 384 512" width={size} fill={fill}>
      <path
        className="icon"
        d="M323.1 441l53.9-53.9c9.4-9.4 9.4-24.5 0-33.9L279.8 256l97.2-97.2c9.4-9.4 9.4-24.5 0-33.9L323.1 71c-9.4-9.4-24.5-9.4-33.9 0L192 168.2 94.8 71c-9.4-9.4-24.5-9.4-33.9 0L7 124.9c-9.4 9.4-9.4 24.5 0 33.9l97.2 97.2L7 353.2c-9.4 9.4-9.4 24.5 0 33.9L60.9 441c9.4 9.4 24.5 9.4 33.9 0l97.2-97.2 97.2 97.2c9.3 9.3 24.5 9.3 33.9 0z"
      />
    </svg>
  </IconContainer>
);
