import * as React from 'react';
import styled from 'styled-components';

export const HiddenWrapper = styled.span`
  position: absolute;
  width: 100%;
  height: 262px;
  .rectangle {
    fill: #d3d3d378;
    stroke-dasharray: 5;
    animation: dash 3s linear infinite;
  }
`;

export const TimeSelection = ({isDragging, selectionArea, selectionArea2}: any): any => {
  // area 1 and 2 represent the starting and ending points of the rect
  const [x] = selectionArea;
  const [cx] = selectionArea2;
  const width = ((cx - x) < 0 ? 0 : (cx - x));

  return <HiddenWrapper style={{ visibility: isDragging ? 'visible' : 'hidden' }}>
    <svg width="100%" height="100%">
      <rect
        className="rectangle"
        x={x}
        y={0}
        width={width || 0}
        height="100%"
        fill="none"
        stroke="grey"
        strokeDasharray="5,5"
      ></rect>
    </svg>
  </HiddenWrapper>
}