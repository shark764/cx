import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useFlexLayout, usePagination, useTable } from 'react-table';
import styled from 'styled-components';
import { LoadSpinner } from '../LoadSpinner';
import { Pagination } from './Pagination';

const TrText = styled.span`
  display: block;
  text-align: center;
  margin: 5px;
  color: ${({ theme }) => theme.colors.secondary};
`;

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
export interface TableProps {
  columns: ColumnData[];
  data: TableData[];
  showPagination?: boolean;
  PaginationComponent?: typeof Pagination;
  pageSizeOptions?: Array<number>;
  loading?: boolean;
  noDataText?: string;
}
export function DataTable({
  columns,
  data,
  showPagination = false,
  PaginationComponent = Pagination,
  pageSizeOptions = [5, 10, 20, 30, 40, 50, 100],
  loading = false,
  noDataText = 'No records found',
}: TableProps) {
  const defaultColumn = React.useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
    }),
    []
  );

  const dataTable = useTable(
    {
      // @ts-ignore
      columns,
      data,
      defaultColumn,
      // @ts-ignore
      initialState: { pageIndex: 0 },
    },
    useFlexLayout,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // @ts-ignore
    page,
  } = dataTable;

  const trData = showPagination ? page : rows;

  return (
    <>
      <div {...getTableProps()} className="table">
        <div className="thead">
          {headerGroups.map((headerGroup: any) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column: any) => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className="tbody">
          {(loading && (
            <div className="tr">
              <div className="td">
                <TrText>Loading...</TrText>
                <LoadSpinner
                  spinnerType="simple"
                  size={25}
                  weight={4}
                  secondary
                />
              </div>
            </div>
          )) ||
            (!loading &&
              trData.length > 0 &&
              trData.map((row: any) => {
                prepareRow(row);
                return (
                  <div {...row.getRowProps()} className="tr">
                    {row.cells.map((cell: any) => (
                      <div {...cell.getCellProps()} className="td">
                        {cell.render('Cell')}
                      </div>
                    ))}
                  </div>
                );
              })) ||
            (!loading && trData.length === 0 && <TrText>{noDataText}</TrText>)}
        </div>
      </div>

      {showPagination && trData.length > 0 && (
        // @ts-ignore
        <PaginationComponent {...dataTable} pageSizeOptions={pageSizeOptions} />
      )}
    </>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string,
      accessor: PropTypes.string,
      // eslint-disable-next-line react/forbid-prop-types
      Cell: PropTypes.any,
    })
  ),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  showPagination: PropTypes.bool,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  PaginationComponent: PropTypes.node,
  loading: PropTypes.bool,
  noDataText: PropTypes.string,
};
