import * as React from 'react';
import { IIcon } from '@cx/types/icon';
import { IconContainer } from './IconContainer';

export function Chevron({
  onClick, size = 25, fill = 'grey', className, disabled = false,
}: IIcon) {
  return (
    <IconContainer size={size} className={className} onClick={onClick} disabled={disabled} fill={fill}>
      <svg viewBox="0 0 1792 1792">
        <path
          d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45L531 45q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"
          fill={fill}
        />
      </svg>
    </IconContainer>
  );
}
