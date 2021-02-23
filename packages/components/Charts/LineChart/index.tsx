/*
 * Copyright © 2015-2021 Serenova, LLC. All rights reserved.
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    LineChart as ReChartsLineChart,
    ResponsiveContainer,
} from 'recharts';

import CustomLegend from '../ChartLegend/index';

const Wrapper = styled.div`
  margin-top: 20px;
  font-size: 12px;
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
    two?: number;
};

export interface DataKeys {
    key?: string;
    lineStroke?: string;
    yAxisId?: string;
    name?: string;
};

export interface ChartProps {
    data: Data[];
    onClick?: Function;
    dataKeys: Array<object>;
    xDataKey?: string;
    statName?: string;
    chartName?: string;
    showLegend?: boolean;
    showTooltip?: boolean;
    interval?: number;
    containerWidth?: string;
    containerHeight?: number;
};

export function LineChart({
    data,
    onClick,
    dataKeys,
    xDataKey,
    statName,
    chartName,
    showLegend = true,
    showTooltip = true,
    interval = 0,
    containerWidth = '90%',
    containerHeight = 300,
}: ChartProps) {
  const fillColors = ['#07487a', 'orange', 'green'];
    return (
        <Wrapper>
            {statName && <StatName>{statName}</StatName>}
            <ResponsiveContainer id={`${chartName}-responsive-container`} width={containerWidth} height={containerHeight}>
                <ReChartsLineChart data={data} onClick={onClick}>
                    <XAxis dataKey={xDataKey} interval={interval} />
                    <YAxis yAxisId="left" label={{ value: 'VOLUME', angle: -90, position: 'center', offset: 0 }}>
                    </YAxis>
                    <YAxis yAxisId="right" orientation="right" label={{ value: 'AHT', angle: -90, position: 'center', offset: 0 }} />
                    {showTooltip && (
                        <Tooltip cursor={false} formatter={(value: any) => value} />
                    )}
                    {showLegend && <Legend verticalAlign="top" height={36} content={<CustomLegend payload={dataKeys} />} />}
                    {dataKeys.map((item: any, index) => (
                        <Line
                            key={index.toString()}
                            name={item.name}
                            dataKey={item.key}
                            dot={false}
                            type="monotone"
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

LineChart.propTypes = {
    onClick: PropTypes.func,
    statName: PropTypes.string,
    showLegend: PropTypes.bool,
    showTooltip: PropTypes.bool,
    xDataKey: PropTypes.string.isRequired,
    chartName: PropTypes.string.isRequired,
    data: PropTypes.instanceOf(Array).isRequired,
    dataKeys: PropTypes.arrayOf(PropTypes.object).isRequired,
    containerWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    containerHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default LineChart;
