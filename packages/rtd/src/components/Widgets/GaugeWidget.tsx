import { CircularProgress, Typography } from '@material-ui/core';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Label,
} from 'recharts';
import { DashboardResults, WidgetData } from 'settings/types';
import { getStatisticFormat } from '@cx/utilities/statistic';
import { gaugeColorLevel } from 'settings/settings';
import styled from 'styled-components';
import { StatisticFormat } from '@cx/types';
import {
  Card, CardContent, CardFooter, CardHeader, Container,
} from './Card';

const GaugeCardContent = styled(CardContent)`
  width: 100%;
  height: 100%;
`;

export function GaugeWidget({
  widget,
  data,
  loading = false,
}: {
  widget: WidgetData;
  data: DashboardResults;
  loading: boolean;
}) {
  const value: any = data?.body?.results[widget?.query?.responseKey ?? ''];
  const format: StatisticFormat = widget.presentation.value?.format ?? 'count';
  const wgValue: number | string = getStatisticFormat(value, format, 'gauge');
  const fillColor: string = gaugeColorLevel(widget, value);
  // The value can be duration in milliseconds or different value from percent
  // or count, so we just show 100% for these cases.
  const chartValue = typeof value !== 'number' || value > 100 ? 100 : value;

  return (
    <Container key={widget.id} variant="outlined" elevation={0}>
      <Card>
        {widget.presentation?.header?.show && (
          <CardHeader>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {widget.presentation.header.text}
            </Typography>
          </CardHeader>
        )}
        {value !== undefined && (
          <GaugeCardContent>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart
                width={300}
                height={300}
                margin={{
                  top: 50,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <Pie
                  data={[
                    { name: 'Percent', value: chartValue },
                    { name: 'Base', value: 100 - chartValue },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={90}
                  labelLine={false}
                  blendStroke
                  fill="#8884d8"
                  startAngle={180}
                  endAngle={0}
                >
                  <Label value={wgValue} position="center" />
                  <Cell fill={fillColor} />
                  <Cell fill="#eaeaea" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </GaugeCardContent>
        )}
        {loading && (
          <CardContent>
            <CircularProgress color="secondary" size={50} />
          </CardContent>
        )}
        {widget.presentation?.footer?.show && (
          <CardFooter>
            <Typography variant="subtitle1" color="textSecondary">
              {widget.presentation.footer.text}
            </Typography>
          </CardFooter>
        )}
      </Card>
    </Container>
  );
}
