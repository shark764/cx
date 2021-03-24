import * as React from 'react';
import { useMemo } from 'react';
import { useTable, useRowSelect, useExpanded } from 'react-table';
import styled, { css } from 'styled-components';
import { defineColumns, defineGridTemplateColumns } from './columnDefenitions';
import { CreateUUID } from '@cx/utilities/uuid';

interface TableColumnInfo {
  columnTemplate: string;
};

export interface TableProps {
  tableData: any[];
  columnDefenitions: string[];
  themeVariant: string;
};

const TableWrapper = styled.div<{ themeVariant: string }>`
  border: 1px solid #80808096;
  border-radius: 5px;
  ${({ themeVariant }) => !themeVariant && css`
    padding: 20px;
    background: white;
  `}
  ${({ themeVariant }) => themeVariant === 'forecast' && css`
    margin-top: 20px;
    font-size: 12px;
    max-width: max-content;
  `}
`;

const TableRow = styled.div<{ themeVariant: string, columnBackground: string }>`
  height: 25px;
  &:hover {
    background: #fafaaa54;
    cursor: pointer;
  }
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
  text-align: center;
  ${({ columnBackground }) => columnBackground && `background-color: ${columnBackground};`}
  &:focus {
    ${({ columnBackground }) => columnBackground && `border: 1px solid grey;`}
  }
  ${({ themeVariant }) => themeVariant === 'forecast' && css`
    border-bottom: 1px solid #80808096;
  `}
`;

const TableHeaderRow = styled.div<{ themeVariant: string, columnBackground: string }>`
  ${({ themeVariant }) => !themeVariant && css`
    color: grey;
    margin-bottom: 30px;
  `}
  ${({ themeVariant }) => themeVariant === 'forecast' && css`
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
    padding: 5px;
    text-align: center;
    color: ${({ theme }) => theme.colors.primary};
    border-bottom: 1px solid #80808096;
    ${({ columnBackground }) => columnBackground && `background-color: ${columnBackground};`}
  `}
`;
const TableBody = styled.div<TableColumnInfo>`
  display: grid;
  grid-template-columns: ${({ columnTemplate }) => columnTemplate} ;
`;

export const Table: React.VFC<TableProps> = ({
  tableData,
  columnDefenitions = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7'],
  themeVariant
}) => {
  const gridTemplateColumns = defineGridTemplateColumns(columnDefenitions);
  const data = useMemo(() => tableData || [], [tableData]);
  const columns = useMemo(() => defineColumns(columnDefenitions), [data]);
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      autoResetExpanded: false
    },
    useExpanded,
    useRowSelect,
  );
  return (
    <TableWrapper {...getTableProps()} themeVariant={themeVariant}>
      <TableBody columnTemplate={gridTemplateColumns}>
        {headerGroups.map((headerGroup) => (<>
          {headerGroup.headers.map((column) =>
            <TableHeaderRow
              themeVariant={themeVariant}
              columnBackground={column.columnBackground}
              key={column.id}
            >
              {column.render('Header', { key: column.id })}
            </TableHeaderRow>)}
        </>))}

        {rows.map((row) => {
          prepareRow(row);
          return (<>
            {row.cells.map((cell) => (
              <TableRow
                themeVariant={themeVariant} {...row.getRowProps()}
                columnBackground={cell.column.columnBackground}
                onClick={() => row.toggleRowExpanded()} key={CreateUUID()}
              >
                {cell.render('Cell')}
              </TableRow>
            ))}

          </>);
          // {row.isExpanded && <div style={{width: '100%'}}>
          //   HERYYYYYY
          // </div>}
        })}
      </TableBody>
    </TableWrapper>
  );
}
