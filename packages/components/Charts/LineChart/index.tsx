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
    ResponsiveContainer,
    LineChart as RechartLineChart,
} from 'recharts';

import ChartLegend from '../ChartLegend';

const Wrapper = styled.div`
  margin-top: 50px
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
    lineType?: string;
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
    containerWidth = '80%',
    containerHeight = 200,
}: ChartProps) {
    interface Dotted {
        dotted: string;
    }
    const lineStrokes: Dotted = { dotted: '3 4 5 2' };
    return (
        <Wrapper>
            {statName && <StatName>{statName}</StatName>}
            <ResponsiveContainer id={`${chartName}-responsive-container`} width={containerWidth} height={containerHeight}>
                <RechartLineChart data={data} onClick={onClick}>
                    <XAxis dataKey={xDataKey} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    {showTooltip && (
                        <Tooltip cursor={false} formatter={(value: any) => value} />
                    )}
                    {showLegend && <ChartLegend />}
                    {dataKeys.map((item: any, index) => (
                        <Line
                            key={index.toString()}
                            name={item.name}
                            dataKey={item.key}
                            type={item.lineType}
                            dot={false}
                            yAxisId={item.yAxisId}
                            strokeDasharray={item.lineStroke && '3 4 5 2'}
                            // lineStrokes[item.lineStroke]}
                        />
                    ))}
                </RechartLineChart>
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
