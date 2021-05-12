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
import { pluck, tap, switchMap, takeUntil } from 'rxjs/operators';

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
};
const StyledCircle = styled.circle.attrs<{ yOffset: number }>(({yOffset, cy}) => ({
  cy: yOffset || cy
}))`

`;

// TODO: pass in some kind of callback that will change the parents data array..  ie set the new adjusted value
export const Dot: React.VFC<any> = (props) => {
  const ref: any = useRef(null);
  const [yOffset, setYoffset] = useState(0);

  const domain = [0, props.topValue];

  const pixelsPerTick = props.containerHeight / (domain[1] - domain[0]);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const mousedown$ = fromEvent<MouseEvent>(element, 'mousedown').pipe(tap(e => e.preventDefault() ));
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(tap(e => e.preventDefault() ));
    const mouseup$ = fromEvent<MouseEvent>(element, 'mouseup').pipe(tap(e => e.preventDefault() ));

    const drag$ = mousedown$.pipe(
      switchMap(
        () => mousemove$.pipe(
          pluck('offsetY'),
          takeUntil(mouseup$))
      )).subscribe(offset => {
        // const calculateValue = offset >= 0 ?
        // console.log('offset' ,offset, 'ppt', pixelsPerTick);
        console.log('offset' ,offset, 'ppt', pixelsPerTick);
        console.log('nows' ,offset / pixelsPerTick);
        setYoffset(offset);
      });

    return () => drag$.unsubscribe();
  }, []);

  if (props.dataKey === 'nco' || props.dataKey === 'aht') {
    return (<></>);
  }

  return (<StyledCircle
    {...props}
    yOffset={yOffset}
    ref={ref}
    r="7"
    fill={props.fill}
    />)
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
  intervalLength
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
          <XAxis dataKey={xDataKey} interval={interval} dy={10} />
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
              yAxisId={item.yAxisId}
              stroke={item.color}
              activeDot={<Dot
                topValue={ (item.key === 'nco' || item.key === 'adjustedNco')? ncoYDomain[1] : ahtYDomain[1] }
                containerHeight={containerHeight}
              />}
              strokeDasharray={item.lineStroke && '5 5'}
            />
          ))}
        </ReChartsLineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}
