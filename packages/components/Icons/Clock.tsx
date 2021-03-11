import * as React from 'react';
import { IIcon } from '@cx/types/icon';
import { IconContainer } from './IconContainer';

export function Clock({
  onClick, size = 25, fill = 'grey', className, disabled = false,
}: IIcon): React.ReactElement {
  return (
    <IconContainer className={className} onClick={onClick} disabled={disabled}>
      <svg viewBox="0 0 512 512" width={size} fill={fill}>
        <path d="M256 6C117.9 6 6 117.9 6 256s111.9 250 250 250 250-111.9 250-250S394.1 6 256 6zm0 437.5c-103.4 0-187.5-84.1-187.5-187.5S152.6 68.5 256 68.5 443.5 152.6 443.5 256 359.4 443.5 256 443.5zM412.3 256c0 17.3-14 31.3-31.3 31.3H256c-17.2 0-31.3-14-31.3-31.3V131c0-17.3 14-31.2 31.3-31.2s31.3 14 31.3 31.2v93.8H381c17.3 0 31.3 13.9 31.3 31.2z" />
      </svg>
    </IconContainer>
  );
}
