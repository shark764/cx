import * as React from 'react';
import { IIcon } from '@cx/types/icon';
import { IconContainer } from './IconContainer';

export function Remove({
  onClick, size = 25, fill = 'grey', className, disabled = false,
}: IIcon): React.ReactElement {
  return (
    <IconContainer className={className} onClick={onClick} disabled={disabled}>
      <svg enableBackground="new 0 0 27.965 27.965" viewBox="0 0 27.965 27.965" width={size} height={size} fill={fill}>
        <path d="M13.98 0C6.259 0 0 6.261 0 13.983c0 7.721 6.259 13.982 13.98 13.982 7.725 0 13.985-6.262 13.985-13.982C27.965 6.261 21.705 0 13.98 0zm6.012 17.769l-2.227 2.224s-3.523-3.78-3.786-3.78c-.259 0-3.783 3.78-3.783 3.78l-2.228-2.224s3.784-3.472 3.784-3.781c0-.314-3.784-3.787-3.784-3.787l2.228-2.229s3.553 3.782 3.783 3.782c.232 0 3.786-3.782 3.786-3.782l2.227 2.229s-3.785 3.523-3.785 3.787c0 .251 3.785 3.781 3.785 3.781z" />
      </svg>
    </IconContainer>
  );
}
