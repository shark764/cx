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
  const fillColors = ['#07487a', 'orange', 'green'];

  const interval = useMemo(() => {
    if (intervalLength === 'week') {
      return 24;
    } else if (intervalLength === 'twoDays') {
      return 4;
    } else {
      return 0;
    }
  }, [intervalLength]);

  const yDomain = useMemo(() => {
    if (intervalLength === 'range') {
      return ['auto', 'auto'];
    } else {
      return [0, 'auto'];
    }
  }, [intervalLength]);

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
            domain={yDomain}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: 'AHT _ _ _ _', angle: -90, position: 'center', dx: 15 }}
            domain={yDomain}
          />
          {showTooltip && (
            <Tooltip
              cursor={false}
              formatter={(value: any) => value}
            />
          )}
          {dataKeys.map((item: DataKeys, index) => (
            <Line
              key={index.toString()}
              name={item.name}
              dataKey={item.key}
              dot={false}
              type="linear"
              yAxisId={item.yAxisId}
              fill={fillColors[index]}
              strokeDasharray={item.lineStroke && '3 4 5 2'}
            />
          ))}
        </ReChartsLineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}
