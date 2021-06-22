export type EntityTypes =
  | 'users'
  | 'queues'
  | 'skills'
  | 'groups'
  | 'reasons'
  | 'dashboards';

export type WidgetType =
  | 'label'
  | 'statistic'
  | 'source-switcher'
  | 'gauge'
  | 'table';

export type WidgetFormat = 'count' | 'time' | 'percent' | 'ratio' | 'json';

export interface DashboardTableField {
  header: {
    display: string;
    name?: string;
    format?: string;
    valuePath?: string;
    displayPath?: string;
    options?: { name?: string }[];
  };
  lookup?: string;
  name?: string;
  id?: string;
  format?: string;
  sortOn?: string;
  filterOrderBy?: string;
  subMenu?: boolean;
  linkText?: string;
  actionLink?: boolean;
  checked?: boolean;
}

export interface DashboardTable {
  fields: DashboardTableField[];
  searchOn?: string[];
  preferenceKey?: string;
  freezeState?: boolean;
  orderBy?: string;
  title?: string;
  header?: { all?: boolean };
  showBulkActions?: boolean;
  showCreate?: boolean;
  showSearch?: boolean;
  showColumns?: boolean;
  sref?: string;
}

export interface DashboardGauge {
  data: { columns?: any[]; type?: string; colors?: any };
  gauge: {
    label?: { show: boolean };
    units?: string;
    min?: number;
    max?: number;
  };
  tooltip?: { show: boolean };
  color?: {
    data?: string;
    pattern: string[];
    threshold?: { values: number[] };
  };
  legend?: { show: boolean };
  size?: { width?: number; height?: number };
  bindto?: string;
}

export interface WidgetPresentation {
  show?: boolean;
  text?: string;
  title?: {
    show?: boolean;
    text?: string;
  };
  header?: {
    show?: boolean;
    text?: string;
  };
  value?: {
    format?: WidgetFormat;
  };
  footer?: {
    show?: boolean;
    text?: string;
  };
  gaugeConfig?: DashboardGauge;
  tableConfig?: DashboardTable;
}

export interface WidgetData {
  id: string;
  type: WidgetType;
  query?: {
    api: string;
    endpoint: string;
    responseKey: string;
    parameters: { [key: string]: string };
    middleware?: string[];
    customMiddleware?: string[];
  };
  statistic?: { name?: string };
  entity?: string;
  selectedValue?: string;
  presentation: WidgetPresentation;
  sizeX: number;
  sizeY: number;
  minSizeX?: number;
  minSizeY?: number;
  maxSizeX?: number;
  maxSizeY?: number;
  col: number;
  row: number;
  static?: boolean;
}

export interface WidgetGrid {
  i: string;
  x: number;
  w: number;
  minW: number;
  maxW: number;
  y: number;
  h: number;
  minH: number;
  maxH: number;
  static: boolean;
}

export interface DashboardSetting {
  id: string;
  name: string;
  enabled: boolean;
  dropdownIndex?: number | string;
  indentDropdown?: boolean | string;
  widgets: WidgetData[];
}

export type FilterTypes = 'channelType' | 'direction' | 'group-id' | 'skill-id';
export type WidgetFilterTypes = 'resources' | 'queues' | 'groups' | 'skills';

export interface FilterOptions {
  id: string;
  label: string;
}

export interface GlobalFilter {
  filter: FilterTypes;
  value: string;
}
export interface GlobalFilters {
  channelType: string;
  direction: string;
  'group-id': string;
  'skill-id': string;
}
export interface WidgetFilter {
  filter: string;
  value: string;
}
export interface WidgetFilters {
  [key: string]: string | number;
}

export interface DashboardFilter {
  filter: FilterTypes | WidgetFilterTypes;
  value: string;
}

export interface DashboardRequest {
  [key: string]: {
    statistic: string;
    channelType?: string | null;
    direction?: string | null;
    'group-id'?: string | null;
    'skill-id'?: string | null;
    'queue-id'?: string | null;
    'resource-id'?: string | null;
    generalSkill?: string | null;
    generalGroup?: string | null;
  };
}

export type StatisticUnit = 'count' | 'millis' | 'percentage';
export type DashboardResults = {
  status: number;
  body?: {
    results: {
      [key: string]: number | string | StatisticUnit;
    };
  };
};
export interface DashboardResponse {
  [key: string]: DashboardResults;
}

export interface FormatMap {
  [key: string]: (input: number, type: string) => number | string;
}
