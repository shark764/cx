import * as React from 'react';
import styled from 'styled-components';
import { useDivWidth } from './timeScale';

const TimeBarScheduleBox = styled.div``;
const Bar = styled.div<{ offset: number; length: number }>`
  height: 20px;
  background: #07497aba;
  border-radius: 3px;
  position: absolute;
  left: ${({ offset }) => `${offset}px`};
  width: ${({ length }) => `${length}px`};
`;
const Break = styled.div<{ offset: number; length: number }>`
  height: 20px;
  background: #c4c4c7;
  position: absolute;
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
  console.log(segments);

  const [ref, width] = useDivWidth();
  const [startingHour, endingHour] = domain;
  const totalHoursInSeconds = endingHour * 3600;
  // @ts-ignore
  const secondsPerPixels = width / totalHoursInSeconds;
  const segmentLength = segments.shiftLength * secondsPerPixels;
  const segmentOffset = segments.shiftStartTime * secondsPerPixels;

  const breakSegmentLength = segments.breaks[0].breakLength * secondsPerPixels;
  const breakSegmentOffset = segments.breaks[0].breakStartTime * secondsPerPixels;

  console.log('><><><>', secondsPerPixels);

  // @ts-ignore
  const pixelsPerTick = width / domain[1];
  // @ts-ignore
  const timeSegmentInPixels = Math.max(1, Math.floor(width / pixelsPerTick));

  return (
    // @ts-ignore
    <TimeBarScheduleBox ref={ref} className="stack-context-reset">
      <Bar offset={segmentOffset} length={segmentLength} />
      <Break offset={breakSegmentOffset} length={breakSegmentLength} />
    </TimeBarScheduleBox>
  );
};
