import * as React from 'react';
import styled from 'styled-components';
import { DirectionalIcon } from '@cx/types/icon';
import { IconContainer } from './IconContainer';

const DirectionalContainer = styled<any>(IconContainer)`
  svg {
    transform: rotate(${({ direction }) => (direction === 'left' ? 180 : 0)}deg);
  }
`;

export const Play: React.FC<DirectionalIcon> = ({
  onClick,
  size = 25,
  direction = 'right',
  fill = 'grey',
  className,
  disabled = false,
}): React.ReactElement => (
  <DirectionalContainer className={className} onClick={onClick} disabled={disabled} direction={direction}>
    <svg viewBox="0 0 100 100" width={size} fill={fill}>
      <path
        d="M74.026 88H25.974C18.256 88 12 81.744 12 74.026V25.974C12 18.256 18.256 12 25.974 12h48.052C81.744 12 88 18.256 88 25.974v48.052C88 81.744 81.744 88 74.026 88z"
        strokeMiterlimit="10"
        fill="#fff"
        strokeWidth="8"
        stroke={fill}
      />
      <path
        d="M73.265 51.254l-35.594 20.55A1.447 1.447 0 0 1 35.5 70.55v-41.1a1.448 1.448 0 0 1 2.171-1.254l35.594 20.55c.965.558.965 1.95 0 2.508z"
        direction={direction}
      />
    </svg>
  </DirectionalContainer>
);
