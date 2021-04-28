import styled, { css } from 'styled-components';
import { ITableContainer } from '@cx/types/table';

export const TableContainer = styled.div<ITableContainer>`
  display: block;

  .table {
    gap: 1px;

    ${({ border }) => border
      && css`
        border: 1px solid #80808096;
      `};

    .row {
      display: contents;
    }

    .cell,
    .full-cell,
    .header {
      padding: 0.2rem;
      text-overflow: ellipsis;
      white-space: normal;
      overflow-wrap: break-word;
    }
    .header {
      color: #808080;
      margin-bottom: 30px;
    }
    .full-cell {
      grid-column: 1 / -1;
    }
  }

  .pagination {
    padding: 1.2rem 0;
  }
`;
