import * as React from 'react';
import { useMemo } from 'react';
import { useTable, useRowSelect, useExpanded } from 'react-table';
import styled from 'styled-components';
import { defineColumns, defineGridTemplateColumns } from './columnDefenitions';
import { CreateUUID } from '@cx/utilities/uuid';

interface TableColumnInfo {
  columnTemplate: string;
};

const TableWrapper = styled.div`
  border: solid 1px #80808096;
  border-radius: 5px;
  padding: 20px;
  background: white;
`;

const TableRow = styled.div`
  height: 25px;
  &:hover {
    background: #fafaaa54;
    cursor: pointer;
  }
`;
const TableHeaderRow = styled.div`
  color: grey;
  margin-bottom: 30px;
`;
const TableBody = styled.div<TableColumnInfo>`
  display: grid;
  grid-template-columns: ${({columnTemplate}) => columnTemplate} ;
`;


export interface TableProps {
  tableData: any[];
  columnDefenitions: string[];
};

export const Table: React.VFC<TableProps> = ({tableData, columnDefenitions = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7']}) => {

  const gridTemplateColumns = defineGridTemplateColumns(columnDefenitions);

  const data = useMemo(() => tableData || [], [tableData] );
  const columns = useMemo(() => defineColumns(columnDefenitions), [data])

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
    <TableWrapper {...getTableProps()} >
      <TableBody columnTemplate={gridTemplateColumns}>
        {headerGroups.map((headerGroup) => (<>
          {headerGroup.headers.map((column) => <TableHeaderRow key={column.id} > {column.render('Header', {key: column.id} )} </TableHeaderRow>   )}
        </>))}

        {rows.map((row) => {
          prepareRow(row);
          return (<>
              {row.cells.map((cell) => (
                <TableRow {...row.getRowProps()} onClick={() => row.toggleRowExpanded()} key={CreateUUID()} >
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
