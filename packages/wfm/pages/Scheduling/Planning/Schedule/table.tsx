import * as React from 'react';
import { useTable, useRowSelect } from 'react-table';
import { data } from './fakeData';
import styled from 'styled-components';

const TableWrapper = styled.div`
  border: solid 1px #80808096;
  border-radius: 5px;
  padding: 20px;
  background: white;
`;

const TableRow = styled.div`
  display: grid;
  /* checkbox | name | team | agreed hours | scheduled hours | timezone | competence | conflict | shedule  */
  grid-template-columns: 40px 150px 80px 80px 80px 150px 90px 80px auto;
`;

const TableHeaderRow = styled.div`
  color: grey;
  display: grid;
  margin-bottom: 30px;
  /* checkbox | name | team | agreed hours | scheduled hours | timezone | competence | conflict | shedule  */
  grid-template-columns: 40px 150px 80px 80px 80px 150px 90px 80px auto;
`;

const TableBody = styled.div``;
const TableHeader = styled.div``;

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: any, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      // @ts-ignore
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (<>
        <input title="selected agent" type="checkbox" ref={resolvedRef} {...rest} />
      </>)
  }
)

export function SheduleTable() {
  const columns = React.useMemo(() => [
    { Header: 'Agent', accessor: 'col1',  },
    { Header: 'Team', accessor: 'col2',  },
    { Header: 'Agreed Hours', accessor: 'col3',  },
    { Header: 'Scheduled Hours', accessor: 'col4',  },
    { Header: 'Timezone', accessor: 'col5',  },
    { Header: 'Competence', accessor: 'col6',  },
    { Header: 'Conflict', accessor: 'col7',  },
    { Header: 'Scheduled Hours Visualization', accessor: 'col8', },
  ],[])

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      // @ts-ignore
      columns,
      data,
    },
    useRowSelect,
    hooks => {
      hooks.allColumns.push(columns => [
        {
          id: 'selection',
          disableResizing: true,
          minWidth: 35,
          width: 35,
          maxWidth: 35,
          // @ts-ignore
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <span>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </span>
          ),
          Cell: ({ row }: any) => (
            <span>
              {/* @ts-ignore */}
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </span>
          ),
        },
        ...columns,
      ])

    }
  )

  return (
    <TableWrapper {...getTableProps()} className="table">
      <TableHeader>
        {headerGroups.map((headerGroup) => (
          <TableHeaderRow className="tr" {...headerGroup.getHeaderGroupProps({})}>
            {headerGroup.headers.map((column) => (
              <span className="th">
                {column.render('Header')}
              </span>
            ))}
          </TableHeaderRow>
        ))}
      </TableHeader>
      <TableBody className="tbody">
        {rows.map((row) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()} className="tr">
              {row.cells.map((cell) => (
                <span className="td">
                  {cell.render('Cell')}
                </span>
              ))}
            </TableRow>
          )
        })}
      </TableBody>
    </TableWrapper>
  )
}
