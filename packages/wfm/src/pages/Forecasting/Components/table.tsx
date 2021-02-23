import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
import { IThemed } from '@cx/types';

const TableWrapper = styled.div`
  width: fit-content;
  margin-top: 20px;
  border: 1px solid #80808096;
  border-bottom: none;
  border-radius: 5px;
  font-size: 12px;
`;

const TableHeader = styled.div`
  display: flex;
  color: grey;
  border-bottom: 1px solid #80808096;
`;

interface TableCellProps extends IThemed {
    title?: any;
    header?: any;
    key: string;
}

const TableHeaderCell = styled.span<TableCellProps>`
   width: 200px;
   overflow: hidden;
   text-overflow: ellipsis;
   font-weight: 600;
   padding: 5px;
   text-align: center;
   color: ${({ theme }) => theme.colors.primary};
   ${({ header }) => header === 'ADJUSTMENT' && `background-color: #8ac6dd26;`}
`;

const TableBody = styled.div``;

const TableBodyRow = styled.div`
  display: flex;
  border-bottom: 1px solid #80808096;
`;

const TableBodyCell = styled.span<TableCellProps>`
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
  text-align: center;
  ${({ header }) => header === 'ADJUSTMENT' && `background-color: #8ac6dd26;`}
  &:focus {
    ${({ header }) => header === 'ADJUSTMENT' && `border: 1px solid grey;`}
  }
`;

const StyledInput = styled.input`
   width: 100px;
   margin: 0 auto;
   border: none;
   outline: none;
   background-color: transparent;
`;

interface ForecstingTableProps {
    tableData?: any;
}

export function ForecastingTable({ tableData }: ForecstingTableProps) {
    
    let data: any, setData: any;
    [data, setData] = useState(tableData);
    
    useEffect(() => setData(tableData), [tableData]);

    const handleInputChange = (cellInfo: any, event: any) => {
        let newArr = [...data];
        newArr[cellInfo.row.index][cellInfo.column.id] = event.target.value;
        setData(newArr);
    };

    const columns = useMemo(
        () => [
            { Header: 'MONDAY JAN 11', accessor: 'col0' },
            { Header: 'FORECASTED VOLUME', accessor: 'col1' },
            {
                Header: 'ADJUSTMENT',
                Cell: (cellInfo: any) => {
                    const val = data[cellInfo.row.index][cellInfo.column.id];
                    return (
                        <StyledInput
                            name="input"
                            type="text"
                            onChange={(e) => handleInputChange(cellInfo, e)}
                            value={val}
                        />
                    )
                },
                accessor: 'col2'
            },
            { Header: 'ADJUSTED VOLUME', accessor: 'col3' },
            { Header: 'FORECASTED AHT', accessor: 'col4' },
            {
                Header: 'ADJUSTMENT',
                Cell: (cellInfo: any) => {
                    const val = data[cellInfo.row.index][cellInfo.column.id];
                    return (
                        <StyledInput
                            name="input"
                            type="text"
                            onChange={(e) => handleInputChange(cellInfo, e)}
                            value={val}
                        />
                    )
                },
                accessor: 'col5'
            },
            { Header: 'ADJUSTED AHT', accessor: 'col6' },
            { Header: 'ESTIMATED MAXIMUM HOURS', accessor: 'col7', }
        ],
        []
    );

    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        // @ts-ignore 
        columns,
        data
    });

    return (
        <TableWrapper {...getTableProps()} className="table">
            {headerGroups.map((headerGroup, a) => (
                <TableHeader className="tr" {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => {
                        return (
                            <TableHeaderCell className="th" key={column.id} title={column.render('Header')} header={column.Header}>
                                {column.render('Header')}
                            </TableHeaderCell>
                        )
                    }
                    )}
                </TableHeader>
            ))}
            <>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <TableBodyRow className="tr"  {...row.getRowProps()}>
                            {row.cells.map((cell, idx) => {
                                return (
                                    <TableBodyCell className="td" key={idx.toString()} title={cell.value} header={cell.column.Header}>
                                        {cell.render('Cell')}
                                    </TableBodyCell>
                                )
                            })}
                        </TableBodyRow>
                    )
                })}
            </>
        </TableWrapper>
    )
};
