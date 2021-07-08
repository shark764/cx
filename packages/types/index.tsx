import * as React from 'react';

export interface Props {
  children: React.ReactNode;
}

export interface IContainer {
  height?: string;
  width?: string;
}

export interface IThemed {
  primary?: boolean;
  secondary?: boolean;
  color?: string;
}

export interface IQuery {
  data: any;
  isLoading: boolean;
  isFetching: boolean;
  error: any | Error;
}

export interface LinkItem {
  label: string;
  to: string;
  LinkIcon: React.ComponentType;
}
export interface LinksMap {
  [key: string]: LinkItem;
}
export interface LinksArray {
  [key: string]: LinkItem[];
}
export interface LinkGroup {
  key?: string;
  title: string;
  GroupIcon: React.ComponentType;
  links: LinkItem[];
  open: boolean;
}

export type StatisticFormat =
  | 'count'
  | 'time'
  | 'timestamp'
  | 'percent'
  | 'ratio'
  | 'json';
