import * as React from 'react';
import styled from 'styled-components';

import { useRef, useEffect, useState } from 'react';
import { fromEvent } from 'rxjs';
import { pluck, tap, map, switchMap, takeUntil, takeLast } from 'rxjs/operators';



const StyledCircle = styled.circle.attrs<{ yOffset: number }>(({ yOffset, cy }) => ({
  cy: yOffset || cy
}))`
  cursor: grab;
  .small {
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export const Dot: React.VFC<any> = ({ containerHeight, topValue, adjustemntCallback, dataKey, ...props }) => {
  const ref: any = useRef(null);
  const [yOffset, setYoffset] = useState(0);
  const [adjustment, setAdjustment] = useState(0);
  const [adjustmentText, setAdjustmentText] = useState('');
  const graphHeight = containerHeight - 30;
  const domain = [0, topValue];
  const timestamp = props.payload.ogTimestamp;
  const value = props.value;

  const pixelsPerTick = graphHeight / (domain[1] - domain[0]);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const mousedown$ = fromEvent<MouseEvent>(element, 'mousedown').pipe(tap(e => e.preventDefault()));
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(tap(e => e.preventDefault()));
    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup').pipe(tap(e => e.preventDefault())); // TODO: OR hits upper or lower bounds?
    const drag$ = mousedown$.pipe(
      switchMap(
        () => mousemove$.pipe(
          pluck('offsetY'),
          tap((offset) => setYoffset(offset)),
          map((offset: number) => Math.trunc((graphHeight - offset) / pixelsPerTick)),
          tap((adjustmentValue) => {
            // const percentageChange = Math.trunc(((adjustmentValue - value) / value) * 100);
            setAdjustmentText(`${adjustmentValue}`);
            setAdjustment(adjustmentValue);
          }),
          takeUntil(mouseup$),
          takeLast(1),
        )
      )).subscribe(adjustmentValue => {
        if (adjustemntCallback) {
          adjustemntCallback(adjustmentValue, dataKey, timestamp)
        }
      });

    return () => drag$.unsubscribe();
  }, [graphHeight, pixelsPerTick, adjustemntCallback, dataKey, timestamp, value]);

  if (dataKey === 'nco' || dataKey === 'aht') {
    return (<></>);
  }

  return (<>
    <StyledCircle
      {...props}
      yOffset={yOffset}
      ref={ref}
      r="7"
      fill={props.fill}
    />

    { adjustment &&
      <text
        // TODO: move this to the left if there's no room on the right
        x={props.cx - 100}
        y={yOffset + 5}
        className="small"
      >
        {adjustmentText}
      </text>}
  </>)
};