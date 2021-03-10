import * as React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import { scaleLinear } from 'd3';
import { useDivWidth } from '@cx/utilities/CustomHooks/useDivWidth';
import { translateHourValue } from '@cx/utilities/DateTime';

export interface TimeScaleProps {
  domain: [number, number];
  range?: [number, number];
  standardTime?: boolean;
};

const TimeScaleBox = styled.div`
position: relative;
left: 0px;
`;

const Tick = styled.span<{ xOffset: number }>`
  position: absolute;
  left: ${(props) => props.xOffset || 0}px;
  &:after {
    content: '';
    display: inline-block;
    height: 15px;
    border-left: 1px solid #9c9c9c73;
    position: absolute;
    top: 25px;
    left: 0px;
  }
`;
const TickLabel = styled.span<{ value: number }>`
  position: absolute;
  left: ${({ value }) => (value > 9 ? '-8px' : '-4px')};
  white-space: nowrap;
  word-break: normal;
`;

export const TimeScale: React.FC<TimeScaleProps> = ({ domain = [0, 0], range = [0, 0], standardTime = false }) => {
  const [ref, width] = useDivWidth();

  const xScale = useMemo(
    () => scaleLinear()
      .domain(domain)
      .range([0, width]),
    [width, domain],
  );

  const ticks = useMemo(() => {

    const xScale2 = scaleLinear()
      .domain(domain)
      .range(xScale.range());

    const pixelsPerTick = width / (domain[1] - domain[0]);

    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));

    return xScale2.ticks(numberOfTicksTarget).map((value) => ({ value: translateHourValue(value, standardTime), xOffset: xScale(value) }));

  }, [domain.join('-'), range.join('-'), xScale, width, domain, standardTime]);


  return (
    <TimeScaleBox>
      <div ref={ref} className="stack-context-reset">
        {ticks.map(({ value, xOffset }) => (
          <Tick xOffset={xOffset} key={value[0] + xOffset}  >
            <TickLabel value={value[0]}>{value[1]}</TickLabel>
          </Tick>
        ))}
      </div>
    </TimeScaleBox>
  );
};
