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
  ResponsiveContainer,
  BarChart as RechartsBarChart,
} from 'recharts';
import ChartLegend from '../ChartLegend';

const Wrapper = styled.div`
  margin-top: 50px;
`;

const StatName = styled.h2`
  color: #000000;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

export interface Data {
    name?: string;
    one?: number;
};

export interface ChartProps {
    data: Data[];
    onClick?: Function;
    dataKeys: Array<string>;
    xDataKey?: string;
    statName?: string;
    chartName?: string;
    showLegend?: boolean;
    showTooltip?: boolean;
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
  showLegend = true,
  showTooltip = true,
  containerWidth = '80%',
  containerHeight = 200,
}: ChartProps) {
  return (
    <Wrapper>
      {statName && <StatName>{statName}</StatName>}
      <ResponsiveContainer id={`${chartName}-responsive-container`} width={containerWidth} height={containerHeight}>
        <RechartsBarChart data={data} onClick={onClick}>
          <XAxis dataKey={xDataKey} />
          <YAxis />
          {showTooltip && (
            <Tooltip formatter={(value: any) => value} />
          )}
          {showLegend && <ChartLegend />}
          {dataKeys.map((item: any, index) => (
            <Bar key={index.toString()} dataKey={item} fill="#07487a" />
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
