import { WidgetType } from 'settings/types';
import { GaugeWidget } from './GaugeWidget';
import { LabelWidget } from './LabelWidget';
import { SourceSwitcherWidget } from './SourceSwitcherWidget';
import { StatisticWidget } from './StatisticWidget';
import { TableWidget } from './TableWidget';

export {
  GaugeWidget,
  LabelWidget,
  SourceSwitcherWidget,
  StatisticWidget,
  TableWidget,
};

export const widgetMap: { [key: string]: any } = {
  label: LabelWidget,
  statistic: StatisticWidget,
  gauge: GaugeWidget,
  'source-switcher': SourceSwitcherWidget,
  table: TableWidget,
};

export const getWidgetComponent = (type: WidgetType) => widgetMap[type];
