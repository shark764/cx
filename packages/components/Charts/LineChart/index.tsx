import * as React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';

import { useRef, useEffect, useState } from 'react';
import { fromEvent } from 'rxjs';
import { tap, map, switchMap, takeUntil, takeLast, throttleTime } from 'rxjs/operators';

// import { SelectionRect } from './selectionRect';
import { CustomizedDot } from './customizedDot';
import { TimeSelection } from './timeSelection';
import { Dot } from './dot';

const Wrapper = styled.div`
  margin: 20px auto;
  font-size: 12px;
`;

const StatName = styled.h2`
  color: #000000;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;
export interface DataKeys {
  key?: string;
  lineStroke?: string;
  yAxisId?: string;
  name?: string;
  color?: string;
};
export interface ChartProps {
  data: unknown[];
  onClick?: () => void;
  dataKeys: Array<any>;
  xDataKey?: string;
  statName?: string;
  chartName?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  containerWidth?: string;
  containerHeight?: number;
  intervalLength?: string;
  adjustemntCallback?: any;
  bulkAdjustemntCallback?: any;
  singlePointAdjustment?: boolean;
};

export const LineChart: React.VFC<ChartProps> = ({
  data,
  dataKeys,
  xDataKey,
  statName,
  chartName,
  containerWidth = '100%',
  containerHeight = 300,
  intervalLength,
  adjustemntCallback,
  bulkAdjustemntCallback,
  singlePointAdjustment = false,
}) => {
  const ref: any = useRef(null);
  const [isDragging, setDragging] = useState(false);
  const [selectionArea, setSelectionArea] = useState<any>([0,0]);
  const [selectionArea2, setSelectionArea2] = useState<any>([0,0]);

  useEffect(() => {
    const element = ref.current;

    if (!element || singlePointAdjustment) {
      return;
    }

    const mousedown$ = fromEvent<MouseEvent>(element, 'mousedown').pipe(tap(e => e.preventDefault()));
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
      tap(e => e.preventDefault()),
      throttleTime(150),
    );
    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup').pipe(tap(e => e.preventDefault()));
    const drag$ = mousedown$.pipe(
      map(({offsetY, offsetX}) => ({offsetY, offsetX})),
      tap(({offsetY, offsetX}) => {
        // Start drawing the outlined square, mousedown is the starting point
        setSelectionArea([offsetX, offsetY]);
        setDragging(true);
      }),
      switchMap(
        (startingCoordinates) => mousemove$.pipe(
          map(({offsetY, offsetX}) => ({offsetY, offsetX})),
          tap(({offsetY, offsetX}) => {
            setSelectionArea2([offsetX, offsetY]);
          }),
          takeUntil(mouseup$),
          takeLast(1),
          tap(() => { setDragging(false); }),
          map(endingCoordinates => {
            const { offsetX: startingX, offsetY: startingY } = startingCoordinates;
            const { offsetX: endingX, offsetY: endingY } = endingCoordinates;

            const myDots = document.getElementsByClassName('fancy-dot');
            const dots = Array.from(myDots);
            const dotCoordinates = dots.map((dot) => ({
              x: dot.getAttribute('cx'),
              y: dot.getAttribute('cy'),
              timestamp: dot.getAttribute('datatimestamp'),
              key: dot.getAttribute('datakey'),
              value: dot.getAttribute('value'),
            }))
            .filter((dot: any) => dot.key.includes('adjusted'))
            .filter((dot: any) => {

              if((dot.x >= startingX && dot.x <= endingX)) {
                return true
              } else {
                return false
              }
            });
            return dotCoordinates
          }),
        )
      )).subscribe(selectedDots => {
        bulkAdjustemntCallback(selectedDots);
      });

    return () => drag$.unsubscribe();
  }, [singlePointAdjustment, bulkAdjustemntCallback]);

  const interval = useMemo(() => {
    if (intervalLength === 'week') {
      return 24;
    } else if (intervalLength === 'twoDays') {
      return 4;
    } else if (intervalLength === 'day') {
      return 3;
    } else {
      return 0;
    }
  }, [intervalLength]);

  const [ncoYDomain, ahtYDomain] = useMemo(() => {

    const roundToNearestTen = (value: number) => Math.ceil(value / 10) * 10;
    // @ts-ignore
    const sortDesc = (key) => [...data].sort((a, b) => (b[key] - a[key]))[0]?.[key];

    const largestNco = sortDesc('nco');
    const largestNcoAdjusted = sortDesc('adjustedNco');
    const largestAht = sortDesc('aht');
    const largestAhtAdjusted = sortDesc('adjustedAht');

    const topNco = largestNco > largestNcoAdjusted ? largestNco : largestNcoAdjusted;
    const topAht = largestAht > largestAhtAdjusted ? largestAht : largestAhtAdjusted;

    // TODO: apply some arithmatic based on place value ie 10s round to nearest ten 100s round to nearest 100
    const ncoYDomain = [0, roundToNearestTen(topNco)];
    const ahtYDomain = [0, roundToNearestTen(topAht)];
    return [ncoYDomain, ahtYDomain];
  }, [data]);

  return (
    <Wrapper ref={ref}>
      {statName && <StatName>{statName}</StatName>}
      <TimeSelection className="selection" isDragging={isDragging} selectionArea={selectionArea} selectionArea2={selectionArea2} />
      <ResponsiveContainer
        id={`${chartName}-responsive-container`}
        width={containerWidth}
        height={containerHeight}
      >
        <ComposedChart
          data={data}
          // @ts-ignore
          cursor={singlePointAdjustment ? 'grab' : 'col-resize'}
        >

          <XAxis
            dataKey={xDataKey}
            interval={interval}
            dy={10.47}
            // scale="band"
          />
          <YAxis
            yAxisId="left"
            label={{ value: 'NCO ______', angle: -90, position: 'center', dx: -15 }}
            domain={ncoYDomain}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: 'AHT _ _ _ _', angle: -90, position: 'center', dx: 15 }}
            domain={ahtYDomain}
          />

          {singlePointAdjustment && <Tooltip
            cursor={false}
            offset={20}
          />}

          {dataKeys.map((item: DataKeys) => (
            <Line
              key={item.name}
              name={item.name}
              dataKey={item.key}
              dot={<CustomizedDot isDragging={false} ></CustomizedDot>}
              type="linear"
              yAxisId={item.yAxisId}
              stroke={item.color}
              animationDuration={800}
              activeDot={<Dot
                topValue={(item.key === 'nco' || item.key === 'adjustedNco') ? ncoYDomain[1] : ahtYDomain[1]}
                containerHeight={containerHeight}
                adjustemntCallback={adjustemntCallback}
              />}
              strokeDasharray={item.lineStroke && '5 5'}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}
