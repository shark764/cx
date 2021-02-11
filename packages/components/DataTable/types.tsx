import { Pagination } from './Pagination';

export interface ColumnData {
  Header: string;
  accessor: string;
  Cell?: any;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
}

export interface TableData {
  id: number | string;
}

export interface RowProps {
  id: string | number;
}

export interface FilterProps {
  column: {
    filterValue: string | number;
    preFilteredRows: RowProps[];
    setFilter(arg: string | number | undefined): void;
    id: string | number;
  };
}

export interface TableProps {
  columns: ColumnData[];
  data: TableData[];
  showPagination?: boolean;
  PaginationComponent?: typeof Pagination;
  pageSizeOptions?: Array<number>;
  loading?: boolean;
  noDataText?: string;
  setSelectedRow?(arg: any): void;
}
