import * as React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  LineChart as ReChartsLineChart,
  ResponsiveContainer,
} from 'recharts';

import { useRef, useEffect, useState } from 'react';
import { fromEvent } from 'rxjs';
import { pluck, tap, map, switchMap, takeUntil, takeLast } from 'rxjs/operators';

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
};



const StyledCircle = styled.circle.attrs<{ yOffset: number }>(({yOffset, cy}) => ({
  cy: yOffset || cy
}))`
  cursor: grab;
  .small {
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export const Dot: React.VFC<any> = ({containerHeight, topValue, adjustemntCallback, dataKey, ...props}) => {
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

    const mousedown$ = fromEvent<MouseEvent>(element, 'mousedown').pipe(tap(e => e.preventDefault() ));
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(tap(e => e.preventDefault() ));
    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup').pipe(tap(e => e.preventDefault() )); // TODO: OR hits upper or lower bounds?
    const drag$ = mousedown$.pipe(
      switchMap(
        () => mousemove$.pipe(
            pluck('offsetY'),
            tap((offset) => setYoffset(offset)),
            map((offset: number) => Math.trunc((graphHeight - offset) / pixelsPerTick)),
            tap((adjustmentValue) => {
              // TODO: precentage should be from original forecasted value and not the original adjustment value?
              const percentageChange = Math.trunc(((adjustmentValue - value) / value) * 100);
              setAdjustmentText( `${adjustmentValue} or ${percentageChange}%` );
              setAdjustment( adjustmentValue );
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
        { adjustmentText }
      </text>}
  </>)
};

export const LineChart: React.VFC<ChartProps> = ({
  data,
  onClick,
  dataKeys,
  xDataKey,
  statName,
  chartName,
  showTooltip = true,
  containerWidth = '100%',
  containerHeight = 300,
  intervalLength,
  adjustemntCallback,
}) => {

  const interval = useMemo(() => {
    if (intervalLength === 'week') {
      return 24;
    } else if (intervalLength === 'twoDays') {
      return 4;
    } else {
      return 0;
    }
  }, [intervalLength]);

  const [ncoYDomain, ahtYDomain] = useMemo(() => {

    const roundToNearestTen = (value: number) => Math.ceil(value / 10) * 10;
    // @ts-ignore
    const sortDesc = (key) => [...data].sort((a,b) => (b[key] - a[key]))[0]?.[key];

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
    <Wrapper>
      {statName && <StatName>{statName}</StatName>}
      <ResponsiveContainer
        id={`${chartName}-responsive-container`}
        width={containerWidth}
        height={containerHeight}
      >
        <ReChartsLineChart
          data={data}
          onClick={onClick}
        >
          <XAxis dataKey={xDataKey} interval={interval} dy={10.47} />
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
          {showTooltip && (
            <Tooltip
              cursor={false}
              formatter={(value: any) => value}
            />
          )}
          {dataKeys.map((item: DataKeys) => (
            <Line
              key={item.name}
              name={item.name}
              dataKey={item.key}
              dot={false}
              type="linear"
              // type="monotone"
              yAxisId={item.yAxisId}
              stroke={item.color}
              activeDot={<Dot
                topValue={ (item.key === 'nco' || item.key === 'adjustedNco')? ncoYDomain[1] : ahtYDomain[1] }
                containerHeight={containerHeight}
                adjustemntCallback={adjustemntCallback}
              />}
              strokeDasharray={item.lineStroke && '5 5'}
            />
          ))}
        </ReChartsLineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}
