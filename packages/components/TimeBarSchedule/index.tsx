import * as React from 'react';
import styled from 'styled-components';
import { useDivWidth } from '@cx/utilities/CustomHooks/useDivWidth';
import { ActivitySegments } from './activitySegments';

export interface TimeBarScheduleProps {
  domain: [number, number];
  standardTime: boolean;
  segments: ActivitySegment[],
  domainStartTimestamp: number,
}

export interface ActivitySegment {
  startTime: number;
  endTime: number;
  title: string;
  color: string;
};

export interface ActivitySegmentsProps {
  activitySegments: ActivitySegment[];
  secondsPerPixels: number;
  startHoursOffset: number;
};

export interface ActivitySegmentProps {
  offset: number;
  length: number;
};

const StackContextReset = styled.div`
  position: relative;
`;



export const TimeBarSchedule: React.VFC<TimeBarScheduleProps> = ({
  segments,
  domain,
}) => {
  const [startingHour, endingHour] = domain;
  const totalHoursInSeconds = (endingHour - startingHour) * 3600;

  const [ref, width] = useDivWidth();

  const secondsPerPixels = width / totalHoursInSeconds;

  const startingActivityStartTime = segments[0].startTime;
  const domainStartSecondsOffset = startingActivityStartTime % 3600;
  const startingHoursTimestamp = startingActivityStartTime - domainStartSecondsOffset;

  return (
    <StackContextReset ref={ref} >
      <ActivitySegments
        activitySegments={segments}
        secondsPerPixels={secondsPerPixels}
        startHoursOffset={startingHoursTimestamp}
      />
    </StackContextReset>
  );
};
