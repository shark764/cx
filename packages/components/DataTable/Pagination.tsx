import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import { IPagination } from '@cx/types/table';
import { TextBox } from '../Inputs/TextBox';
import { Button } from '../Inputs/Button';
import { Select } from '../Inputs/Select';
import { FastForward } from '../Icons/FastForward';
import { Next } from '../Icons/Next';
import { Divider } from '../Divider';

const Button2 = styled(Button)`
  padding: 10px 15px;
  border-radius: 4px;

`;
const TextBox2 = styled(TextBox)`
  width: 100px;
  display: inline-block;
`;
const Select2 = styled(Select)`
  width: auto;
  display: inline-block;
`;

const FastForward2 = styled(FastForward)`
  transform: rotate(180deg);
`;
const Next2 = styled(Next)`
  transform: rotate(180deg);
`;
const Divider2 = styled(Divider)`
  border-left: 1px solid;
  border-radius: 0;
  display: inline-block;
  line-height: normal;
  vertical-align: middle;
`;

export function Pagination({
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
}: IPagination) {
  const theme: any = useTheme();

  return (
    <div className="pagination">
      <Button2 type="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        <FastForward2 size={10} fill={'green'} />
      </Button2>
      {' '}
      <Button2 type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
        <Next2 size={10} fill={'green'} />
      </Button2>
      {' '}
      <Button2 type="button" onClick={() => nextPage()} disabled={!canNextPage}>
        <Next size={10} fill={'green'} />
      </Button2>
      {' '}
      <Button2 type="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        <FastForward size={10} fill={'green'} />
      </Button2>
      {' '}
      <span>
        Page
        {' '}
        <strong>
          {pageIndex + 1}
          {' of '}
          {pageOptions.length}
        </strong>
        {' '}
      </span>
      <span>
        <Divider2 direction="vertical" size={25} />
        {' '}
        Go to page:
        {' '}
        <TextBox2
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const gtPage = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(gtPage);
          }}
        />
      </span>
      {' '}
      <Select2
        name="page-size"
        title="Page size options"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {pageSizeOptions.map((optPageSize: number) => (
          <option key={optPageSize} value={optPageSize}>
            Show
            {' '}
            {optPageSize}
          </option>
        ))}
      </Select2>
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
