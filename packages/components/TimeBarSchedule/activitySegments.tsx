import * as React from 'react';
import styled from 'styled-components';
import { ActivitySegmentProps, ActivitySegmentsProps } from './index';

const ActivtySegment = styled.div.attrs<ActivitySegmentProps>(({color, offset, length}) => ({
  style: {
    background: color,
    left: `${offset}px`,
    width: `${length}px`,
  }
}))`
  height: 20px;
  position: absolute;
  top: 0px;
  box-sizing: border-box;
  :last-of-type {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  :first-of-type {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
`;

export const ActivitySegments: React.VFC<ActivitySegmentsProps> = ({
  activitySegments,
  secondsPerPixels,
  startHoursOffset,
}) => <>
  { activitySegments.map((activitySegment) => {
    const activitySegmentLength = (activitySegment.endTime - activitySegment.startTime) * secondsPerPixels;
    const activitySegmentOffset = (activitySegment.startTime - startHoursOffset) * secondsPerPixels;
    return (
      <ActivtySegment
        color={activitySegment.color}
        className="activitySegment"
        key={activitySegment.title + activitySegment.startTime}
        offset={activitySegmentOffset}
        length={activitySegmentLength}
      />
    );
  }) }
  </>