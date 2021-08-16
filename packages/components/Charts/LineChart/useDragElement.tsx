import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import { fromEvent } from 'rxjs';
import { pluck, tap, map, switchMap, takeUntil, takeLast } from 'rxjs/operators';

type ElementRefrence = React.RefObject<HTMLDivElement> | null;

export const useDragElement = (containerHeight, topValue, adjustemntCallback,dataKey, setadjustmentconfig,  props) => {
  const ref: ElementRefrence = useRef(null);
  const [yOffset, setYoffset] = useState(0);

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

    const mousedown$ = fromEvent<MouseEvent>(element, 'mousedown').pipe(tap(e => e.preventDefault()  ));
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(tap(e => { e.preventDefault(); e.stopPropagation(); }  ));
    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup').pipe(tap(e => e.preventDefault()  )); // TODO: OR hits upper or lower bounds?
    const drag$ = mousedown$.pipe(
      switchMap(
        () => mousemove$.pipe(
          pluck('offsetY'),
          tap((offset) => setYoffset(offset)),
          map((offset: number) => Math.trunc((graphHeight - offset) / pixelsPerTick) - value  ),
          tap((adjustmentValue) => {
            setadjustmentconfig(`${adjustmentValue + value}`);
          }),
          takeUntil(mouseup$),
          takeLast(1),
        )
      )).subscribe(adjustmentValue => {
        setadjustmentconfig(``);
        if (adjustemntCallback) {
          adjustemntCallback(adjustmentValue, dataKey, timestamp)
        }
      });

    return () => drag$.unsubscribe();
  }, [graphHeight, pixelsPerTick, timestamp, value, setadjustmentconfig, adjustemntCallback, dataKey]);

  return [ref, yOffset]
};