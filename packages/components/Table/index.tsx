import * as React from 'react';
import { useMemo, Fragment } from 'react';
import {
  usePagination,
  useTable,
  useFilters,
  useRowSelect,
  useExpanded,
  ColumnInstance,
  Row,
  Cell,
} from 'react-table';
import styled, { css } from 'styled-components';
import { ITable } from '@cx/types/table';
import { CircularProgress, Grid, Theme } from '@material-ui/core';
import { defineColumns, defineGridTemplateColumns } from './columnDefinitions';
import { Pagination } from './Pagination';
import { DefaultColumnFilter } from './filters';
import { fuzzyText, startsWithText } from './filterTypes';
import { ColumnSwitcher } from './ColumnSwitcher';

interface TableColumnInfo {
  columnTemplate: string;
  isClickable: boolean;
}

type ThemeVariant = 'default' | 'forecast' | 'realtime';

export interface TableProps {
  tableData: any[];
  columnDefinitions: string[];
  themeVariant: ThemeVariant;
  viewMode?: string;
}

const TableWrapper = styled.div<{ themeVariant: ThemeVariant }>`
  border-radius: 5px;
  ${({ themeVariant }) => !themeVariant
    && css`
      padding: 20px;
      background: white;
    `}
  ${({ themeVariant }) => themeVariant === 'forecast'
    && css`
      margin-top: 20px;
      font-size: 12px;
      max-width: max-content;
    `}
`;

const TableCell = styled.div<{
  themeVariant: ThemeVariant;
  columnBackground: string;
}>`
  height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
  text-align: center;
  ${({ themeVariant }) => (themeVariant === 'forecast' || themeVariant === 'realtime')
    && css`
      border-bottom: 1px solid #80808038;
    `};
  ${({ themeVariant }) => themeVariant === 'realtime'
    && css`
      text-align: left;
    `}
  background-color: ${({ columnBackground }) => columnBackground || 'none'}
`;

const TableHeader = styled.div<{
  themeVariant: ThemeVariant;
  columnBackground?: string;
}>`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  color: grey;
  ${({ themeVariant }) => !themeVariant
    && css`
      margin-bottom: 30px;
    `};
  ${({ themeVariant }) => themeVariant === 'forecast'
    && css`
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 600;
      padding: 5px;
      text-align: center;
    `};
  ${({ theme, themeVariant }: { theme: Theme; themeVariant: ThemeVariant }) => themeVariant === 'realtime'
    && css`
      margin-bottom: ${theme.spacing(1)};
      color: #808080;
      text-overflow: ellipsis;
      font-weight: 600;
      padding: 5px;
      /* text-align: center; */
    `};
`;
const Columns = styled.div<TableColumnInfo>`
  display: grid;
  grid-template-columns: ${({ columnTemplate }) => columnTemplate};
  &:hover {
    cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'auto')};
  }
`;

const TableBody = styled.div``;

const ExpandedSubRow = styled.div`
  width: 100%;
`;

const FullCell = styled.div`
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  border-top: 1px solid #80808038;
  border-bottom: 1px solid #80808038;
`;
const RowText = styled.span`
  display: block;
  text-align: center;
  margin: 5px;
`;

export const Table: React.VFC<any> = ({
  tableData,
  columnDefinitions,
  themeVariant,
  viewMode,
  rowComponent,
  showPagination = false,
  PaginationComponent = Pagination,
  pageIndex = 0,
  pageSize = 25,
  pageSizeOptions = [5, 10, 20, 25, 30, 40, 50, 100],
  loading = false,
  noDataText = 'No records found',
  showColumnSwitcher = false,
  ColumnSwitcherComponent = ColumnSwitcher,
  hiddenColumns = [],
  onToggleHideColumn,
  ...rest
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      disableFilters: true,
      Filter: DefaultColumnFilter, // default Filter UI
    }),
    [],
  );
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyText filter type.
      fuzzyText,
      // Text filter with "startWith"
      startsWithText,
    }),
    [],
  );
  const gridTemplateColumns = defineGridTemplateColumns(columnDefinitions);
  const data = useMemo(() => tableData || [], [tableData]);
  const columns = useMemo(() => defineColumns(columnDefinitions), [
    columnDefinitions,
  ]);
  const {
    allColumns,
    canNextPage,
    canPreviousPage,
    getTableProps,
    getToggleHideAllColumnsProps,
    gotoPage,
    headerGroups,
    nextPage,
    // If pagination, instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    page,
    pageCount,
    pageOptions,
    prepareRow,
    previousPage,
    rows,
    selectedFlatRows,
    setHiddenColumns,
    setPageSize,
    state,
    toggleHideAllColumns,
    toggleHideColumn,
    // toggleRowExpanded
  } = useTable(
    {
      columns,
      data,
      autoResetExpanded: false,
      defaultColumn,
      filterTypes,
      initialState: { hiddenColumns, pageIndex, pageSize },
    },
    useExpanded,
    useFilters,
    usePagination,
    useRowSelect,
  );

  const columnSelectorProps = {
    toggleHideAllColumns,
    setHiddenColumns,
    onToggleHideColumn,
    state,
    getToggleHideAllColumnsProps,
    allColumns,
  };
  const paginationProps = {
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state,
  };

  const tableRows = showPagination ? page : rows;

  return (
    <>
      {showColumnSwitcher && (
        <Grid
          container
          /* spacing={4} */
          justifyContent="flex-end"
        >
          <Grid item>
            <ColumnSwitcher {...columnSelectorProps} />
          </Grid>
        </Grid>
      )}

      <TableWrapper {...getTableProps()} themeVariant={themeVariant}>
        <TableBody>
          {headerGroups.map((headerGroup, idx) => (
            <Columns
              columnTemplate={gridTemplateColumns}
              isClickable={!!rowComponent}
              key={idx.toString()}
            >
              {headerGroup.headers.map((column: ColumnInstance) => (
                <TableHeader
                  themeVariant={themeVariant}
                  // columnBackground={column.columnBackground}
                  // columnTemplate={gridTemplateColumns}
                  {...column.getHeaderProps()}
                  key={column.id}
                >
                  <span>
                    {column.render('Header', {
                      key: column.id,
                      viewMode,
                    })}
                  </span>

                  <span>
                    {column.canFilter ? column.render('Filter') : null}
                  </span>
                </TableHeader>
              ))}
            </Columns>
          ))}

          {(loading && (
            <FullCell>
              <RowText>Loading...</RowText>
              <CircularProgress color="secondary" size={35} />
            </FullCell>
          ))
            || (!loading
              && tableRows.length > 0
              && tableRows.map((row: Row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <Columns
                      {...row.getRowProps()}
                      columnTemplate={gridTemplateColumns}
                      isClickable={!!rowComponent}
                      onClick={
                        rowComponent ? () => row.toggleRowExpanded() : undefined
                      }
                    >
                      {row.cells.map((cell: Cell) => (
                        <TableCell
                          {...cell.getCellProps()}
                          themeVariant={themeVariant}
                          columnBackground={cell.column.columnBackground}
                          // columnTemplate={gridTemplateColumns}
                          key={cell.getCellProps().key}
                        >
                          <span>{cell.render('Cell', { ...rest })}</span>
                        </TableCell>
                      ))}
                    </Columns>
                    {row.isExpanded && (
                      <ExpandedSubRow>
                        {rowComponent({ ...row })}
                      </ExpandedSubRow>
                    )}
                  </Fragment>
                );
              }))
            || (!loading && tableRows.length === 0 && (
              <FullCell>
                <RowText>{noDataText}</RowText>
              </FullCell>
            ))}
        </TableBody>
      </TableWrapper>

      {showPagination && tableRows.length > 0 && (
        <PaginationComponent
          {...paginationProps}
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </>
  );
};
