import * as React from 'react';
import { IIcon } from '@cx/types/icon';
import { IconContainer } from './IconContainer';

export function Day({
  onClick,
  size = 25,
  fill = 'grey',
  className,
  disabled = false,
}: IIcon): React.ReactElement {
  return (
    <IconContainer className={className} onClick={onClick} disabled={disabled}>
      <svg
        viewBox="0 0 24 24"
        width={size}
        fill={fill}
      >
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"/>
        <rect stroke="white" strokeWidth="1" x="11" y="11" width="2" height="2" fill="white" />
        <rect stroke="white" strokeWidth="1" x="15" y="11" width="2" height="2" fill="white" />
      </svg>
    </IconContainer>
  );
}
