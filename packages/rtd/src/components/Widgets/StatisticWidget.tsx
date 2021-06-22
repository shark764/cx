import { CircularProgress, Typography } from '@material-ui/core';
import { DashboardResults, WidgetData, WidgetFormat } from 'settings/types';
import { getStatisticFormat } from 'settings/settings';
import {
  Card, CardContent, CardFooter, CardHeader, Container,
} from './Card';

export function StatisticWidget({
  widget,
  data,
  loading = false,
}: {
  widget: WidgetData;
  data: DashboardResults;
  loading: boolean;
}) {
  const value: any = data?.body?.results[widget?.query?.responseKey ?? ''];
  const format: WidgetFormat = widget.presentation.value?.format ?? 'count';
  const wgValue: number | string = getStatisticFormat(
    value,
    format,
    'statistic',
  );

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
        <CardContent>
          {value !== undefined && (
            <Typography variant="h3" color="textSecondary">
              {wgValue}
            </Typography>
          )}
          {loading && <CircularProgress color="secondary" size={50} />}
        </CardContent>
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
