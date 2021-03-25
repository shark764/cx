import * as React from 'react';
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
};

export const BarChart: React.VFC<ChartProps> = ({
  data,
  onClick,
  dataKeys,
  xDataKey,
  chartName,
  interval = 0,
  showTooltip = true,
  stackId,
  containerWidth = '96%',
  containerHeight = 300,
}) => {

  const fillColors = ['#07487a', 'orange', 'green'];

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
            <Bar key={index.toString()} dataKey={item} fill={fillColors[index]} barSize={20} stackId={stackId} />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}
