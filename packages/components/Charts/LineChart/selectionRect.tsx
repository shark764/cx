import * as React from 'react';
import styled from 'styled-components';

export const HiddenWrapper = styled.span`
  position: absolute;
  width: 100%;
  height: 300px;
  .rectangle {
    stroke-dasharray: 5;
    animation: dash 3s linear infinite;
  }
`;

export const SelectionRect = ({isDragging, selectionArea, selectionArea2}: any): any => {
  const [x, y] = selectionArea;
  const [cx, cy] = selectionArea2;

  return <HiddenWrapper style={{ visibility: isDragging ? 'visible' : 'hidden' }}>
    <svg width="100%" height="100%">
      <rect className="rectangle" x={x} y={y} width={(cx - x) || 0} height={(cy - y) || 0} fill="none" stroke="grey" strokeDasharray="5,5" ></rect>
    </svg>
  </HiddenWrapper>
}