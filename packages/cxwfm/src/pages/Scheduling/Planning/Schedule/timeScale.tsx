import * as React from 'react';
import {
  useRef, useState, useEffect, useMemo,
} from 'react';
import styled from 'styled-components';
import { scaleLinear } from 'd3';

const TimeScaleBox = styled.div``;

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
`;

export const TimeScale: React.FC<any> = ({ domain, range = [0, 0] }) => {
  const [ref, width] = useDivWidth();

  const xScale = useMemo(
    () => scaleLinear()
      .domain(domain)
    // @ts-ignore
      .range([0, width]),
    // return [scale.domain(), scale.range()];
    [width],
  );

  const ticks = useMemo(() => {
    const xScale2 = scaleLinear()
      .domain(domain)
      .range(xScale.range());

    // @ts-ignore
    const pixelsPerTick = width / domain[1];

    // @ts-ignore
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));

    return xScale2.ticks(numberOfTicksTarget).map((value) => ({ value, xOffset: xScale(value) }));
  }, [domain.join('-'), range.join('-'), xScale, width]);

  return (
    <TimeScaleBox>
      {/* @ts-ignore */}
      <div ref={ref} className="stack-context-reset">
        {ticks.map(({ value, xOffset }) => (
          <Tick xOffset={xOffset} key={value}>
            <TickLabel value={value}>{value}</TickLabel>
          </Tick>
        ))}
      </div>

      <span />
    </TimeScaleBox>
  );
};

export const useDivWidth = () => {
  const ref = useRef();
  const [width, changeWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }
    // @ts-ignore
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      const entry = entries[0];

      if (width != entry.contentRect.width) changeWidth(entry.contentRect.width);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.unobserve(element);
  }, []);

  return [ref, width];
};
