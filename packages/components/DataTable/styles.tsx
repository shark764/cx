import styled, { css } from 'styled-components';

interface ITableContainer {
  border?: boolean;
}
export const TableContainer = styled.div<ITableContainer>`
  padding: 1rem;
  display: block;
  overflow: auto;

  .table {
    gap: 1px;

    ${({ border }) => border
      && css`
        border: 1px solid black;
      `};

    .cell,
    .full-cell,
    .header {
      padding: 0.5rem;
    }
    .full-cell {
      grid-column: 1 / -1;
    }
  }

  .pagination {
    padding: 1.2rem 0;
  }
`;
