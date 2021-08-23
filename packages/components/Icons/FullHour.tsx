import * as React from 'react';
import { IIcon } from '@cx/types/icon';
import { IconContainer } from './IconContainer';

export function FullHour({
  onClick, size = 25, fill = 'grey', className, disabled = false,
}: IIcon): React.ReactElement {
  return (
    <IconContainer className={className} onClick={onClick} disabled={disabled}>
      <svg
        viewBox="0 0 24 24"
        width={size}
        fill={fill}
      >
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="
          M15.07
          1.01h-6v2h6v-2zm-4
          13h2v-6h-2v6zm8.03-6.62l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42
          1.42C16.14
          4.74
          14.19
          4
          12.07
          4c-4.97
          0-9
          4.03-9
          9s4.02
          9
          9
          9
          9-4.03
          9-9c0-2.11-.74-4.06-1.97-5.61zm-7.03
          12.62c-3.87
          0-7-3.13-7-7s3.13-7
          7-7
          7
          3.13
          7
          7-3.13
          7-7
          7z"
        />
        <circle
          r="7"
          cx="12"
          cy="13"
          fill="white"
        />
        <circle
          r="3"
          cx="12"
          cy="13"
          stroke={ fill }
          fill="none"
          strokeWidth={'6'}
        />
        <path strokeWidth="1" stroke="white" d="M12 20 12 6" fill="white"/>
        <path strokeWidth="1" stroke="white" d="M18 13 6 13" fill="white"/>
      </svg>
    </IconContainer>
  );
}
