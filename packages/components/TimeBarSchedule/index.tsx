import * as React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import { useDivWidth } from '@cx/utilities/CustomHooks/useDivWidth';
import { ActivitySegments } from './activitySegments';
import { DateTime } from 'luxon';
export interface TimeBarScheduleProps {
  segments: ActivitySegment[],
  domain: [number, number];
  standardTime: boolean;
  showTimeScale: boolean;
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
  const [ref, width] = useDivWidth();

  const [startTimeInSeconds, secondsPerPixels] = useMemo(() => {

    const [startingHour, endingHour] = domain;
    const totalHoursInSeconds = (endingHour - startingHour) * 3600;
    const secondsPerPixels = width / totalHoursInSeconds;
    const startingActivityStartTime = segments[0].startTime;
    const startTime = DateTime.fromSeconds(startingActivityStartTime);
    const startTimeInSeconds = startTime.startOf('day').toMillis() / 1000;

    return [startTimeInSeconds, secondsPerPixels];
  }, [segments, width]);

  return (
    <StackContextReset ref={ref} >
      <ActivitySegments
        activitySegments={segments}
        secondsPerPixels={secondsPerPixels}
        startHoursOffset={startTimeInSeconds}
      />
    </StackContextReset>
  );
};
