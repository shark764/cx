import * as React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
} from 'recharts';

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
  dataKeys: Array<string>;
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

  const colorKey: any = {
    'staffingEstimateVoice': '#2a2af0',
    'staffingEstimateMessaging': '#ca472f',
    'staffingEstimateSms': '#9dd766',
    'staffingEstimateEmail': '#f6c85f',
    'staffingEstimateWork-item': '#6f4e7c',
  };

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
            <Tooltip formatter={(value: any) => value} />
          )}
          {dataKeys.map((item: any, index) => (
            <Bar key={index.toString()} dataKey={item} fill={colorKey[item]} barSize={20} stackId={stackId} />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}
