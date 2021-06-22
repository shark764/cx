import { DashboardResults, WidgetData } from 'settings/types';
import { Container } from './Card';

export function TableWidget({
  widget,
  data,
  loading = false,
}: {
  widget: WidgetData;
  data: DashboardResults;
  loading: boolean;
}) {
  return <Container key={widget.id} variant="outlined" elevation={0} />;
}
