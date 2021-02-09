import * as React from 'react';
import * as PropTypes from 'prop-types';

interface PagProps {
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
export function Pagination(props: PagProps) {
  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    pageSizeOptions,
  } = props;

  return (
    <div className="pagination">
      <button
        type="button"
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        {'<<'}
      </button>{' '}
      <button
        type="button"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        {'<'}
      </button>{' '}
      <button type="button" onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
      </button>{' '}
      <button
        type="button"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        {'>>'}
      </button>{' '}
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1}
          {' of '}
          {pageOptions.length}
        </strong>{' '}
      </span>
      <span>
        | Go to page:{' '}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const gtPage = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(gtPage);
          }}
          style={{ width: '100px' }}
        />
      </span>{' '}
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {pageSizeOptions.map((optPageSize: number) => (
          <option key={optPageSize} value={optPageSize}>
            Show {optPageSize}
          </option>
        ))}
      </select>
    </div>
  );
}

Pagination.propTypes = {
  canPreviousPage: PropTypes.bool,
  canNextPage: PropTypes.bool,
  state: PropTypes.shape({
    pageIndex: PropTypes.number,
    pageSize: PropTypes.number,
  }),
  pageCount: PropTypes.number,
  pageOptions: PropTypes.arrayOf(PropTypes.number),
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  gotoPage: PropTypes.func,
  nextPage: PropTypes.func,
  previousPage: PropTypes.func,
  setPageSize: PropTypes.func,
};
