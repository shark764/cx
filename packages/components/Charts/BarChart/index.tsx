/*
 * Copyright © 2015-2021 Serenova, LLC. All rights reserved.
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
} from 'recharts';

const Wrapper = styled.div`
  margin-top: 20px;
  font-size: 12px;
`;

const StatName = styled.h2`
  color: #000000;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
`;

const CustomLegend = styled.span`
  color: black;
  font-size: 12px;
  font-weight: 600;
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

export function BarChart({
  data,
  onClick,
  dataKeys,
  xDataKey,
  statName,
  chartName,
  interval = 0,
  showLegend = true,
  showTooltip = true,
  stackId,
  containerWidth = '90%',
  containerHeight = 300,
}: ChartProps) {

  const fillColors = ['#07487a', 'orange', 'green'];
  const renderColorfulLegendText = (value: string) => {
    return <CustomLegend>{value && value.toUpperCase()}</CustomLegend>
  };

  return (
    <Wrapper>
      {statName && <StatName>{statName}</StatName>}
      <ResponsiveContainer id={`${chartName}-responsive-container`} width={containerWidth} height={containerHeight}>
        <RechartsBarChart data={data} onClick={onClick}>
          <XAxis dataKey={xDataKey} interval={interval} />
          <YAxis />
          {showTooltip && (
            <Tooltip formatter={(value: any) => value} />
          )}
          {showLegend && <Legend formatter={renderColorfulLegendText} />}
          {dataKeys.map((item: any, index) => (
            <Bar key={index.toString()} dataKey={item} fill={fillColors[index]} barSize={20} stackId={stackId} />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

BarChart.propTypes = {
  onClick: PropTypes.func,
  statName: PropTypes.string,
  showLegend: PropTypes.bool,
  showTooltip: PropTypes.bool,
  xDataKey: PropTypes.string.isRequired,
  chartName: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  containerWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  containerHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default BarChart;
