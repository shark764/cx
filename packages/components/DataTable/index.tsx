import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  // @ts-ignore
  useGridLayout,
  usePagination,
  useTable,
  useFilters,
  useRowSelect,
} from 'react-table';
import styled from 'styled-components';
import { ITable } from '@cx/types/table';
import { LoadSpinner } from '../LoadSpinner';
import { Pagination } from './Pagination';
import { DefaultColumnFilter } from './filters/DefaultColumnFilter';
import { fuzzyText, startsWithText } from './filterTypes';

const TrText = styled.span`
  display: block;
  text-align: center;
  margin: 5px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }: any, ref: any) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" placeholder="check" ref={resolvedRef} {...rest} />
    </>
  );
});
const IndeterminateRadio = React.forwardRef(({ indeterminate, ...rest }: any, ref: any) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="radio" placeholder="select" ref={resolvedRef} {...rest} />
    </>
  );
});

export function DataTable({
  columns,
  data,
  showPagination = false,
  PaginationComponent = Pagination,
  pageSizeOptions = [5, 10, 20, 30, 40, 50, 100],
  loading = false,
  noDataText = 'No records found',
  oneRowSelectable = false,
  multipleRowSelectable = false,
  setSelectedRow,
}: ITable) {
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

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    // @ts-ignore
    page, // If pagination, instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    // @ts-ignore
    canPreviousPage,
    // @ts-ignore
    canNextPage,
    // @ts-ignore
    pageOptions,
    // @ts-ignore
    pageCount,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    nextPage,
    // @ts-ignore
    previousPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    selectedFlatRows,
    // @ts-ignore
    state: { pageIndex, pageSize, selectedRowIds },
    // @ts-ignore
    toggleAllRowsSelected,
    // @ts-ignore
    toggleRowSelected,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
      // @ts-ignore
      defaultColumn,
      filterTypes,
      autoResetSelectedRows: false,
      // @ts-ignore
      initialState: { pageIndex: 0 },
    },
    useGridLayout,
    useFilters,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.getTableProps.push((props, _ref) => {
        const { instance } = _ref;
        let gridTemplateColumns = instance.columns
          .map((col) =>
            // @ts-ignore
            (col.columnWidth ? `${col.columnWidth}px` : 'auto'))
          .join(' ');
        if (oneRowSelectable || multipleRowSelectable) {
          gridTemplateColumns = `auto ${gridTemplateColumns}`;
        }

        return [
          props,
          {
            style: {
              display: 'grid',
              gridTemplateColumns,
            },
          },
        ];
      });
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        ...(multipleRowSelectable
          ? [
            {
              id: 'selection',
              // The header can use the table's getToggleAllRowsSelectedProps method
              // to render a checkbox
              Header: ({ getToggleAllRowsSelectedProps }: any) => (
                <div>
                  <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                </div>
              ),
              // The cell can use the individual row's getToggleRowSelectedProps method
              // to the render a checkbox
              Cell: ({ row }: any) => (
                <div>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              ),
            },
          ]
          : []),
        ...(oneRowSelectable
          ? [
            {
              id: 'selection',
              // The cell can use the individual row's getToggleRowSelectedProps method
              // to the render a checkbox
              Cell: ({ row }: any) => (
                <div>
                  <IndeterminateRadio
                    {...row.getToggleRowSelectedProps()}
                    onClick={() => {
                      // AWFUL solution, but it works
                      toggleAllRowsSelected(false);
                      toggleRowSelected(row.id, true);
                      setSelectedRow && setSelectedRow(row.original);
                    }}
                  />
                </div>
              ),
            },
          ]
          : []),
        ...columns,
      ]);
    },
  );

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
    state: { pageIndex, pageSize, selectedRowIds },
  };

  const trData = showPagination ? page : rows;

  return (
    <>
      <div {...getTableProps()} className="table">
        {headerGroups.map((headerGroup: any) => headerGroup.headers.map((column: any) => (
          <div {...column.getHeaderProps()} className="cell header">
            {column.render('Header')}

            <div>{column.canFilter ? column.render('Filter') : null}</div>
          </div>
        )))}

        {(loading && (
          <div className="full-cell">
            <TrText>Loading...</TrText>
            <LoadSpinner spinnerType="simple" secondary />
          </div>
        ))
          || (!loading
            && trData.length > 0
            && trData.map((row: any) => {
              prepareRow(row);
              return (
                <div {...row.getRowProps()} className={`row${row.isSelected ? ' row-selected' : ''}`}>
                  {row.cells.map((cell: any) => (
                    <div {...cell.getCellProps()} className="cell">
                      {cell.render('Cell')}
                    </div>
                  ))}
                </div>
              );
            }))
          || (!loading && trData.length === 0 && (
            <div className="full-cell">
              <TrText>{noDataText}</TrText>
            </div>
          ))}
      </div>

      {showPagination && trData.length > 0 && (
        <PaginationComponent {...paginationProps} pageSizeOptions={pageSizeOptions} />
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
    }),
  ),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  showPagination: PropTypes.bool,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  PaginationComponent: PropTypes.node,
  loading: PropTypes.bool,
  noDataText: PropTypes.string,
};

export { TableContainer } from './styles';
