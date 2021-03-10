import * as React from 'react';
import { Pagination } from '@cx/components/DataTable/Pagination';

export interface IColumnData {
  id?: string;
  Header: string | React.ReactNode;
  accessor?: string | undefined;
  Cell?: any;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  columnWidth?: number;
  SubCell?: any;
}

export interface ITableData {
  id?: number | string;
}

export interface IRow {
  id: string | number;
}

export interface IFilter {
  column: {
    filterValue: string | number;
    preFilteredRows: IRow[];
    setFilter(arg: string | number | undefined): void;
    id: string | number;
  };
}

export interface ITable {
  columns: IColumnData[];
  data: ITableData[];
  showPagination?: boolean;
  PaginationComponent?: typeof Pagination;
  pageIndex?: number;
  pageSize?: number;
  pageSizeOptions?: Array<number>;
  loading?: boolean;
  noDataText?: string;
  onTableRowSelection?(row: any): void;
  oneRowSelectable?: boolean;
  multipleRowSelectable?: boolean;
  onToggleAllRowsSelected?(bool?: boolean): void;
}

export interface ITableContainer {
  border?: boolean;
}

export interface IPagination {
  canPreviousPage: boolean;
  canNextPage: boolean;
  state: any;
  pageCount: number;
  pageOptions: Array<number>;
  pageSizeOptions: Array<number>;
  gotoPage(arg: number): void;
  nextPage(): void;
  previousPage(): void;
  setPageSize(arg: number): void;
}
