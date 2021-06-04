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
  viewMode?: string;
};

const TableWrapper = styled.div<{ themeVariant: string }>`
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

const TableCell = styled.div<{ themeVariant: string, columnBackground: string }>`
  height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
  text-align: center;
  ${({ themeVariant }) => themeVariant === 'forecast' && css`
    border-bottom: 1px solid #80808038;
  `}
  background-color: ${({columnBackground}) => columnBackground ? columnBackground : 'none'}
`;

const TableHeader = styled.div<{ themeVariant: string, columnBackground: string }>`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  color: grey;
  ${({ themeVariant }) => !themeVariant && css`
    margin-bottom: 30px;
  `}
  ${({ themeVariant }) => themeVariant === 'forecast' && css`
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
    padding: 5px;
    text-align: center;
  `}
`;
const Columns = styled.div`
  display: grid;
  grid-template-columns: ${({ columnTemplate }) => columnTemplate};
  &:hover {
    cursor: pointer;
  }
`;

const TableBody = styled.div<TableColumnInfo>`
`;

export const Table: React.VFC<any> = ({
  tableData,
  columnDefenitions,
  themeVariant,
  viewMode,
  rowComponent,
  ...rest
}) => {
  const gridTemplateColumns = defineGridTemplateColumns(columnDefenitions);
  const data = useMemo(() => tableData || [], [tableData]);
  const columns = useMemo(() => defineColumns(columnDefenitions), [columnDefenitions]);
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    // toggleRowExpanded
  } = useTable(
    {
      columns,
      data,
      autoResetExpanded: true
    },
    useExpanded,
    useRowSelect,
  );
  return (
    <TableWrapper {...getTableProps()} themeVariant={themeVariant}>
      <TableBody>
        {headerGroups.map((headerGroup) => (<Columns columnTemplate={gridTemplateColumns} key={CreateUUID()}>
          {headerGroup.headers.map((column) =>
            <TableHeader
              themeVariant={themeVariant}
              // columnBackground={column.columnBackground}
              key={column.id}
              // columnTemplate={gridTemplateColumns}
            >
              <span>{column.render('Header', {
                key: column.id,
                viewMode: viewMode
              })}</span>
            </TableHeader>)}
        </Columns>))}

        {rows.map((row) => {
          prepareRow(row);
          return (<Columns columnTemplate={gridTemplateColumns} key={CreateUUID()} >
            {row.cells.map((cell) => (
              <TableCell
                themeVariant={themeVariant} {...row.getRowProps()}
                columnBackground={cell.column.columnBackground}
                // columnTemplate={gridTemplateColumns}
                // @ts-ignore
                onClick={() => row.toggleRowExpanded()}
                key={CreateUUID()}
              >
                <span>{cell.render('Cell', {...rest})}</span>
              </TableCell>
            ))}
          {row.isExpanded && <div style={{width: '100%'}}>
            { rowComponent({...row}) }
          </div>}
          </Columns>);
        })}
      </TableBody>
    </TableWrapper>
  );
}
