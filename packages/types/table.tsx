import * as React from 'react';
import { Pagination } from '@cx/components/DataTable/Pagination';

export interface IColumnData {
  Header: string | React.ReactNode;
  accessor: string;
  Cell?: any;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  columnWidth?: number;
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
  state: {
    pageIndex: number;
    pageSize: number;
  };
  pageCount: number;
  pageOptions: Array<number>;
  pageSizeOptions: Array<number>;
  gotoPage(arg: number): void;
  nextPage(): void;
  previousPage(): void;
  setPageSize(arg: number): void;
}
