import * as React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
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
import { CustomizedDot } from './customizedDot';
import { TimeSelection } from './timeSelection';
import { CustomDot } from './dot';
import Card from '@material-ui/core/Card';

const Wrapper = styled.div`
  position: relative;
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
  multipleChannelsSelected?: boolean;
};
interface DotInfo {
  cx: number;
  type: string;
  ceiling: number;
  value: number;
  timestamp: string;
  pixelsPerTick: number;
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
  multipleChannelsSelected,
}) => {
  const ref: any = useRef(null);
  const [isDragging, setDragging] = useState(false);
  const [selectionArea, setSelectionArea] = useState<any>([0,0]);
  const [selectionArea2, setSelectionArea2] = useState<any>([0,0]);
  const [adjustmentConfig, setadjustmentconfig] = useState([0,0,'50']);
  const [dragDateTime, setDragDateTime] = useState(null);

  const singlePointDragging = adjustmentConfig[0] !== 0 && adjustmentConfig[1] !== 0;

  const graphHeight = containerHeight - 30;

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const mousedown$ = fromEvent<MouseEvent>(element, 'mousedown').pipe(tap(e => e.preventDefault()));
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(tap(e => e.preventDefault()),throttleTime(50));
    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup').pipe(tap(e => e.preventDefault()));
    const drag$ = mousedown$.pipe(
      map(({ target: element }) => {
        const cx =  element.getAttribute("cx");
        const timestamp =  element.getAttribute("data-timestamp");
        const type =  element.getAttribute("data-type");
        const value =  parseInt(element.getAttribute("value"));
        const ceiling =  parseInt(element.getAttribute("data-ceiling"));
        setDragDateTime(timestamp);

        const domain = [0, ceiling]; //TODO: domain doesn't always start at zero...
        const pixelsPerTick = graphHeight / (domain[1] - domain[0]);

        return {
          cx,
          type,
          ceiling,
          value,
          timestamp,
          pixelsPerTick,
        }
      }),
      switchMap(
        (dotInfo: DotInfo) => mousemove$.pipe(
          map(({offsetX, offsetY}) => {
            const adjustmentValue = Math.trunc((graphHeight - offsetY) / dotInfo.pixelsPerTick) - dotInfo.value;
            const { type, timestamp } = dotInfo;
            setadjustmentconfig([dotInfo.cx,offsetY,`${adjustmentValue + dotInfo.value}`])
            return { adjustmentValue, type, timestamp };
          }),
          takeUntil(mouseup$),
          takeLast(1),
        )
      )).subscribe(({ adjustmentValue, type, timestamp }) => {
        setadjustmentconfig([0,0,'']);
        if (adjustemntCallback) {
          adjustemntCallback(adjustmentValue, type, timestamp)
        }
      });

    return () => drag$.unsubscribe();
  }, [adjustemntCallback, graphHeight]);

  useEffect(() => {
    const element = ref.current;

    if (!element || singlePointAdjustment || multipleChannelsSelected) {
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
  }, [singlePointAdjustment, bulkAdjustemntCallback, multipleChannelsSelected]);

  const interval = useMemo(() => {
    if (intervalLength === 'week') {
      return 23;
    } else if (intervalLength === 'twoDays') {
      return 3;
    } else if (intervalLength === 'day') {
      return 3;
    } else {
      return 0;
    }
  }, [intervalLength]);

  const [ncoYDomain, ahtYDomain] = useMemo(() => {

    if (data.length < 1) {
      return [ 0, 0 ];
    }

    const truncateYDomain = intervalLength === 'range';

    const roundUpToNearestTen = (value: number) => Math.ceil(value / 10) * 10;
    const roundDownToNearestTen = (value: number) => Math.floor(value / 10) * 10;
    // @ts-ignore
    const sortDesc = (key) => [...data].sort((a, b) => (b[key] - a[key]));

    const pluck = (key: string, object: any) => object[key];
    const first = (array: any[]) => array[0];
    const last = (array: any[]) => array[array.length - 1];

    const domainEnd = (array: any[], key: string, lastOrFirst: any) => pluck(key, lastOrFirst(array));

    // eslint-disable-next-line
    const [_, _2, nco, adjustedNco, aht, adjustedAht] = Object.keys(data[0]);

    const sortedNco = sortDesc(nco);
    const sortedNcoAdjusted = sortDesc(adjustedNco);
    const sortedAht = sortDesc(aht);
    const sortedAhtAdjusted = sortDesc(adjustedAht);

    const largestNco = domainEnd(sortedNco, nco, first);
    const largestNcoAdjusted = domainEnd(sortedNcoAdjusted, adjustedNco, first);
    const largestAht = domainEnd(sortedAht, aht, first);
    const largestAhtAdjusted = domainEnd(sortedAhtAdjusted, adjustedAht, first);

    const smallestNco = domainEnd(sortedNco, nco, last);
    const smallestNcoAdjusted = domainEnd(sortedNcoAdjusted, adjustedNco, last);
    const smallestAht = domainEnd(sortedAht, aht, last);
    const smallestAhtAdjusted = domainEnd(sortedAhtAdjusted, adjustedAht, last);


    const topNco = largestNco > largestNcoAdjusted ? largestNco : largestNcoAdjusted;
    const topAht = largestAht > largestAhtAdjusted ? largestAht : largestAhtAdjusted;

    const bottomNco = smallestNco > smallestNcoAdjusted ? smallestNco : smallestNcoAdjusted;
    const bottomAht = smallestAht > smallestAhtAdjusted ? smallestAht : smallestAhtAdjusted;

    const ncoYDomain = [truncateYDomain ? roundDownToNearestTen(bottomNco) : 0, roundUpToNearestTen(topNco)];
    const ahtYDomain = [truncateYDomain ? roundDownToNearestTen(bottomAht) : 0, roundUpToNearestTen(topAht)];

    return [ncoYDomain, ahtYDomain];
  }, [data, intervalLength]);

  const whichCursor = () => {
    if(multipleChannelsSelected) {
      return 'default';
    };

    if(singlePointDragging) {
      return 'none';
    }

    if (singlePointAdjustment) {
      return 'grab';
    } else if (!singlePointAdjustment) {
      return 'col-resize';
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    const time = DateTime.fromISO(singlePointDragging? dragDateTime : payload?.[0]?.payload.ogTimestamp).toLocaleString(DateTime.TIME_SIMPLE);

    if (active && payload && payload.length) {
      return (
        <Card sx={{padding: '20px'}} variant="outlined">
          { singlePointDragging ? <>
            <p>{`${time}`}</p>
            <p> Set value to: {adjustmentConfig[2]}</p>
          </> : <>
            <p>{time}</p>
            {payload.map(({color, name, value}: any, index:number) => <p style={{color: color}} key={index}>
              {name} : {value}
            </p>) }
          </>}
        </Card>
      );
    } else {
      return null;
    }
  };

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
          cursor={whichCursor()}
        >

          <XAxis
            dataKey={xDataKey}
            interval={interval}
            dy={10.47}
          />
          <YAxis
            yAxisId="left"
            label={{ value: 'NCO ______', angle: -90, position: 'center', dx: -15, fill: '#07487a' }}
            // @ts-ignore
            domain={ncoYDomain}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: multipleChannelsSelected ? '' : 'AHT ______', angle: -90, position: 'center', dx: 15, fill: 'grey' }}
            // @ts-ignore
            domain={multipleChannelsSelected ? null : ahtYDomain}
          />

          {singlePointAdjustment && <Tooltip
            cursor={false}
            offset={20}
            content={<CustomTooltip />}
          />}

          {singlePointDragging && <circle
            cx={adjustmentConfig[0]}
            cy={adjustmentConfig[1]}
            r={9}
            fill="white"
            stroke="grey"
          />}

          {dataKeys.map((item: DataKeys) => (
            <Line
              key={item.name}
              name={item.name}
              dataKey={item.key}
              type="linear"
              yAxisId={item.yAxisId}
              stroke={item.color}
              animationDuration={800}
              activeDot={ item.key?.includes('adjusted') && !singlePointDragging && <CustomDot
                topValue={(item.key?.toLowerCase().includes( 'nco')) ? ncoYDomain[1] : ahtYDomain[1]}
              />}
              strokeDasharray={item.lineStroke && '5 5'}
              dot={<CustomizedDot
                isDragging={false}
              ></CustomizedDot>}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}
