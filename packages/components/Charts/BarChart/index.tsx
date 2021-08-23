import * as React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
} from 'recharts';
import Card from '@material-ui/core/Card';

const Wrapper = styled.div`
  margin-top: 20px;
  font-size: 12px;
`;

export interface Data {
  name?: string;
  one?: number;
};

export interface ChartProps {
  data: Data[];
  onClick?: () => void;
  dataKeys: Array<any>;
  xDataKey?: string;
  statName?: string;
  chartName?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  interval?: number;
  stackId?: any;
  containerWidth?: string;
  containerHeight?: number;
  intervalLength?: any;
};

const CustomTooltip = ({ active, payload }: any) => {
  const time = DateTime.fromISO( payload?.[0]?.payload.ogTimestamp );
  const timeDisplay = time.isValid ? time.toLocaleString(DateTime.TIME_SIMPLE) : '';
  const total = payload.reduce((acc: number,{value}: any) => acc += value,0);

  if (active && payload && payload.length) {
    return (
      <Card sx={{padding: '20px'}} variant="outlined">
        <p>{timeDisplay}</p>
        {payload.map(({color, name, value}: any, index:number) => <p style={{color: color}} key={index}>
          {name} : {value}
        </p>) }
        {payload.length > 1 && <p>Total : {total}</p>}
      </Card>
    );
  } else {
    return null;
  }
};

export const BarChart: React.VFC<ChartProps> = ({
  data,
  onClick,
  dataKeys,
  xDataKey,
  chartName,
  intervalLength,
  showTooltip = true,
  stackId,
  containerWidth = '96%',
  containerHeight = 300,
}) => {

  const interval = useMemo(() => {
    if (intervalLength === 'week') {
      return 24;
    } else if (intervalLength === 'twoDays') {
      return 4;
    } else if (intervalLength === 'day') {
      return 4;
    } else {
      return 0;
    }
  }, [intervalLength]);

  return (
    <Wrapper>
      <ResponsiveContainer id={`${chartName}-responsive-container`} width={containerWidth} height={containerHeight}>
        <RechartsBarChart data={data} onClick={onClick}>
          <XAxis dataKey={xDataKey} interval={interval} dy={10} />
          <YAxis />
          {showTooltip && (
            <Tooltip content={<CustomTooltip />} />
          )}
          {dataKeys.map((item: any) => (
            <Bar
              key={item.channelTag}
              name={item.name}
              dataKey={item.key}
              fill={item.color}
              barSize={20}
              stackId={stackId}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}
