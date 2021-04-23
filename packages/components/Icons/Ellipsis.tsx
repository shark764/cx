import * as React from 'react';

interface Props {
  dur?: number;
  width?: number;
  fill?: string;
  animated?: boolean;
}

export const Ellipsis: React.FC<Props> = ({ dur = 2, width = 25, fill = 'grey', animated = false }) => (
  <svg width={width} viewBox="0 0 150 50" fill={fill}>
    { [ ['25', '-0.75s'], ['75', '-0.5s'], ['125', '-0.25s'] ].map(([cx,begin], index) => (
      <circle cx={cx} cy="25" r="20" key={index}>
        { animated &&
        <animate
          repeatCount="indefinite"
          attributeName="opacity"
          type="scale"
          begin={begin}
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          values="0;1;0"
          keyTimes="0;0.5;1"
          dur={`${dur}s`}
        />}
      </circle>
    )) }
  </svg>
);