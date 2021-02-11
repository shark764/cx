import * as React from 'react';
import { useTable, useBlockLayout, useResizeColumns } from 'react-table';
import { data } from './fakeData';
import styled from 'styled-components';

const TableWrapper = styled.div`
  border: solid 1px #80808096;
  border-radius: 5px;
  padding: 20px;
`;

const Styles = styled.div`

  .table {
    display: inline-block;
    border-spacing: 0;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }
    .th {
      margin-bottom: 15px;
    }

    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #8080801f;
      border-right: 1px solid #8080801f;
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        width: 10px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: red;
        }
      }
    }
  }
`

export const SheduleTable = () => {

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      // width: 150,
      // maxWidth: 400,
    }),
    []
  )

  const columns = React.useMemo(() => [
      { width: 100, Header: 'Agent', accessor: 'col1',  },
      { width: 70, Header: 'Team', accessor: 'col2',  },
      { width: 70, Header: 'Agreed Hours', accessor: 'col3',  },
      { width: 80, Header: 'Scheduled Hours', accessor: 'col4',  },
      { width: 190, Header: 'Timezone', accessor: 'col5',  },
      { width: 100, Header: 'Competence', accessor: 'col6',  },
      { width: 70, Header: 'Conflict', accessor: 'col7',  },
      { width: 700, Header: 'Scheduled Hours Visualization', accessor: 'col8', },
    ],[])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // @ts-ignore
    resetResizing,
    // @ts-ignore
  } = useTable({ columns, data, defaultColumn }, useBlockLayout, useResizeColumns)

  return (
    <>
      <Styles>
      {/* <button onClick={resetResizing}>Reset Resizing</button> */}
      <TableWrapper>
        <div {...getTableProps()} className="table">
          <div>
            {headerGroups.map(headerGroup => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map(column => (
                  <div {...column.getHeaderProps()} className="th">
                    {column.render('Header')}
                    {/* Use column.getResizerProps to hook up the events correctly */}
                    <div
                    // @ts-ignore
                      {...column.getResizerProps()}
                      className={`resizer ${
                        // @ts-ignore
                        column.isResizing ? 'isResizing' : ''
                      }`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <div {...row.getRowProps()} className="tr">
                  {row.cells.map(cell => {
                    return (
                      <div {...cell.getCellProps()} className="td">
                        {cell.render('Cell')}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </TableWrapper>
      </Styles>

    </>
  )
}