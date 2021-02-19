import * as React from 'react';
import styled from 'styled-components';
import { useDivWidth } from './timeScale';

const TimeBarScheduleBox = styled.div``;

const Bar = styled.div<{ offset: number; length: number }>`
  height: 20px;
  background: #07497aba;
  border-radius: 3px;
  position: relative;
  left: ${({ offset }) => `${offset}px`};
  width: ${({ length }) => `${length}px`};
`;
const Break = styled.div<{ offset: number; length: number }>`
  height: 20px;
  background: #c4c4c7;
  position: relative;
  top: -20px;
  left: ${({ offset }) => `${offset}px`};
  width: ${({ length }) => `${length}px`};
`;

export interface TimeBarScheduleProps {
  segments: {
    shiftStartTime: number;
    shiftLength: number;
    breaks: {
      name: string;
      breakStartTime: number;
      breakLength: number;
    }[];
  };
  domain: number[];
}
export interface Width {
  width: number;
}

export const TimeBarSchedule: React.FC<TimeBarScheduleProps> = ({ segments, domain }) => {

  const [ref, width] = useDivWidth();
  const [startingHour, endingHour] = domain;
  const totalHoursInSeconds = endingHour * 3600;
  // @ts-ignore
  const secondsPerPixels = width / totalHoursInSeconds;
  const segmentLength = segments.shiftLength * secondsPerPixels;
  const segmentOffset = segments.shiftStartTime * secondsPerPixels;

  const breakSegmentLength = segments.breaks[0].breakLength * secondsPerPixels;
  const breakSegmentOffset = segments.breaks[0].breakStartTime * secondsPerPixels;

  return (
    // @ts-ignore
    <TimeBarScheduleBox ref={ref} className="stack-context-reset">
      <Bar offset={segmentOffset} length={segmentLength} />
      <Break offset={breakSegmentOffset} length={breakSegmentLength} />
    </TimeBarScheduleBox>
  );
};
