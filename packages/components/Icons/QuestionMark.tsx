import * as React from 'react';
import { IIcon } from '@cx/types/icon';
import { IconContainer } from './IconContainer';

export const QuestionMark: React.FC<IIcon> = ({
  onClick,
  size = 25,
  fill = 'grey',
  className,
  disabled = false,
}): React.ReactElement => (
  <IconContainer className={className} onClick={onClick} disabled={disabled}>
    <svg viewBox="0 0 131.735 132.204" width={size} fill={fill}>
      <g
        fillOpacity="1"
        fillRule="evenodd"
        stroke="none"
        direction="ltr"
        transform="matrix(1.26972 0 0 1.26972 2.382 -1206.613)"
        visibility="visible"
      >
        <path
          d="M49.92 972.337c-10.4 0-18.943 8.2-18.943 18.34a2 2 0 104 0c0-7.898 6.629-14.34 14.943-14.34 4.15 0 8.321 1.69 11.183 4.308 2.861 2.618 4.397 5.994 3.778 9.704a2 2 0 000 .002c-1.335 8.068-4.964 9.415-9.125 11.97-2.08 1.276-4.332 2.818-5.863 5.492-1.531 2.673-2.237 6.29-1.837 11.468a2 2 0 103.988-.308c-.361-4.682.293-7.379 1.32-9.173 1.027-1.794 2.533-2.873 4.485-4.071 3.902-2.396 9.436-5.413 10.978-14.723v-.002c.864-5.19-1.388-9.983-5.024-13.31-3.637-3.327-8.674-5.357-13.883-5.357z"
          baselineShift="baseline"
          display="inline"
          enableBackground="accumulate"
          overflow="visible"
        />
        <path
          d="M50 1024.717c-2.179 0-3.99 1.826-3.99 4s1.8 4 3.99 4c2.19 0 3.991-1.814 3.991-4s-1.812-4-3.991-4z"
          baselineShift="baseline"
          display="inline"
          enableBackground="accumulate"
          overflow="visible"
        />
        <path
          d="M50 958.177c-24.28 0-44 19.814-44 44.19 0 24.376 19.72 44.18 44 44.18s44-19.804 44-44.18-19.72-44.19-44-44.19zm0 4c22.11 0 40 17.966 40 40.19 0 22.224-17.89 40.18-40 40.18s-40-17.956-40-40.18 17.89-40.19 40-40.19z"
          baselineShift="baseline"
          display="inline"
          enableBackground="accumulate"
          overflow="visible"
        />
      </g>
    </svg>
  </IconContainer>
);
