import * as React from 'react';
import styled from 'styled-components';
import { IPagination } from '@cx/types/table';
import {
  Divider,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Theme,
} from '@material-ui/core';
import {
  NavigateBefore,
  NavigateNext,
  SkipNext,
  SkipPrevious,
} from '@material-ui/icons';

const Container = styled.div`
  padding: 1.2rem 0;
`;
const GridContainer = styled(Grid)`
  width: fit-content;
  ${({ theme }: { theme: Theme }) => `
    padding: ${theme.spacing(0, 2)};
    /* border: 1px solid ${theme.palette.divider}; */
    border-radius: ${theme.shape.borderRadius};
    background-color: ${theme.palette.background.paper};
    color: ${theme.palette.text.secondary};
    & hr {
      margin: ${theme.spacing(0, 2)};
    }
  `};
`;
const PageTextField = styled(TextField)`
  & .MuiInputBase-formControl {
    width: 100px;
  }
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
}: IPagination): JSX.Element {
  return (
    <Container>
      <GridContainer container alignItems="center" gap={0.5}>
        <IconButton
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          aria-label="go to first"
        >
          <SkipPrevious />
        </IconButton>
        <IconButton
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          aria-label="go to previous"
        >
          <NavigateBefore />
        </IconButton>
        <IconButton
          onClick={() => nextPage()}
          disabled={!canNextPage}
          aria-label="go to next"
        >
          <NavigateNext />
        </IconButton>
        <IconButton
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          aria-label="go to last"
        >
          <SkipNext />
        </IconButton>
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
        <Divider orientation="vertical" flexItem />
        <span>Go to page: </span>
        <PageTextField
          type="number"
          value={pageIndex + 1}
          onChange={(e) => {
            const gtPage = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(gtPage);
          }}
          variant="outlined"
          size="small"
        />
        <TextField
          select
          name="page-size"
          title="Page size options"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          variant="outlined"
          size="small"
        >
          {pageSizeOptions.map((optPageSize: number) => (
            <MenuItem key={optPageSize} value={optPageSize}>
              Show
              {' '}
              {optPageSize}
            </MenuItem>
          ))}
        </TextField>
      </GridContainer>
    </Container>
  );
}
