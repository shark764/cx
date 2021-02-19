import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';

import { tableData } from '../fakeData';

const TableWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

const TableHeader = styled.div``;

const TableHeaderRow = styled.div`
  display: flex;
  color: grey;
  text-align: center;
  margin-bottom: 30px;
`;

const TableHeaderCell = styled.span`
  flex-basis: 120px;
`;

const TableBody = styled.div``;

const TableBodyRow = styled.div`
  display: flex;
  height: 25px;
  text-align: center;
`;

const TableBodyCell = styled.span`
   flex-basis: 120px;
`;

export function ForecastingTable() {
    const data = useMemo(() => tableData, []);

    const columns = useMemo(
        () => [
            { Header: '', accessor: 'col0' },
            { Header: '6 AM', accessor: 'col1' },
            { Header: '7 AM', accessor: 'col2' },
            { Header: '8 AM', accessor: 'col3' },
            { Header: '9 AM', accessor: 'col4' },
            { Header: '10 AM', accessor: 'col5' },
            { Header: '11 AM', accessor: 'col6' },
            { Header: '12 PM', accessor: 'col7', },
            { Header: '1 PM', accessor: 'col8' },
            { Header: '2 PM', accessor: 'col9' },
            { Header: '3 PM', accessor: 'col10' },
            { Header: '4 PM', accessor: 'col11' },
            { Header: '5 PM', accessor: 'col12' },
            { Header: '6 PM', accessor: 'col13' },
            { Header: '7 PM', accessor: 'col14' },
            { Header: '8 PM', accessor: 'col15' },
            { Header: '9 PM', accessor: 'col16' },
            { Header: '10 PM', accessor: 'col17' },
            { Header: '11 PM', accessor: 'col18' },
            { Header: '12 AM', accessor: 'col19' },
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
            <TableHeader>
                {headerGroups.map(headerGroup => (
                    <TableHeaderRow className="tr" {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <TableHeaderCell className="th" key={column.id}>
                                {column.render('Header')}
                            </TableHeaderCell>
                        ))}
                    </TableHeaderRow>
                ))}
            </TableHeader>
            <TableBody className="tbody">
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <TableBodyRow className="tr" {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <TableBodyCell className="td" >
                                        {cell.render('Cell')}
                                    </TableBodyCell>
                                )
                            })}
                        </TableBodyRow>
                    )
                })}
            </TableBody>
        </TableWrapper>
    )
};
