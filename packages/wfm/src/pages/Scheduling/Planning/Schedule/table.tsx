import * as React from 'react';
import { useMemo } from 'react';
import { useTable, useRowSelect } from 'react-table';
import styled from 'styled-components';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import { agentShedules } from '@cx/fakedata';
import { WorkSchedule } from '@cx/components/WorkSchedule';
import { TimeScale } from '@cx/components/TimeScale';
import { Legend } from './legend';

function CreateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const TableWrapper = styled.div`
  border: solid 1px #80808096;
  border-radius: 5px;
  padding: 20px;
  background: white;
`;

const TableRow = styled.div`
  display: grid;
  height: 25px;
  /* checkbox | name | team | agreed hours | scheduled hours | timezone | competence | conflict | shedule  */
  grid-template-columns: 40px 150px 80px 60px 60px 150px 40px 40px auto;
`;

const TableHeaderRow = styled.div`
  color: grey;
  display: grid;
  margin-bottom: 30px;
  /* checkbox | name | team | agreed hours | scheduled hours | timezone | competence | conflict | shedule  */
  grid-template-columns: 40px 150px 80px 60px 60px 150px 40px 40px auto;
`;

const SheduleTitle = styled.h4`
  color: grey;
  font-style: italic;
  margin-top: 0px;
  margin-left: 10px;
`;
const SheduleHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TableBody = styled.div``;
const TableHeader = styled.div``;

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }: any, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    // @ts-ignore
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input title="selected agent" type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

const CenteredText = styled.div`
  text-align: center;
  font-size: 11px;
`;
const CenteredNumber = styled.div`
  text-align: center;
`;
const CompetenceIcon = styled(CheckRoundedIcon)<{ value: boolean }>`
  display: ${({ value }) => (value ? 'inherit' : 'none !important')};
`;
const WarningIcon = styled(WarningRoundedIcon)<{ value: boolean }>`
  display: ${({ value }) => (value ? 'inherit' : 'none !important')};
`;

export function SheduleTable() {
  const columns = useMemo(
    () => [
      { Header: 'Agent', accessor: 'col1' },
      { Header: 'Team', accessor: 'col2' },
      {
        Header: <CenteredText>Agreed Hours</CenteredText>,
        Cell: ({ value }: any) => <CenteredNumber>{value}</CenteredNumber>,
        accessor: 'col3',
      },
      {
        Header: <CenteredText>Sheduled Hours</CenteredText>,
        Cell: ({ value }: any) => <CenteredNumber>{value}</CenteredNumber>,
        accessor: 'col4',
      },
      { Header: 'Timezone', accessor: 'col5' },
      {
        Header: '',
        Cell: ({ value }: any) => <CompetenceIcon value={value} style={{ color: 'rgb(69 107 46)' }} />,
        accessor: 'col6',
      },
      {
        Header: '',
        Cell: ({ value }: any) => <WarningIcon value={value} style={{ color: '#f17100' }} />,
        accessor: 'col7',
      },
      {
        Header: <TimeScale domain={[0, 24]} />,
        Cell: ({ value }: any) => <WorkSchedule domain={[0, 24]} segments={value} showTimeScale={false} standardTime={false} />,
        accessor: 'col8',
      },
    ],
    [],
  );

  const data = useMemo(() => agentShedules.sort((a, b) => a.col8[0].startTime - b.col8[0].startTime), []);

  const {
    getTableProps, headerGroups, rows, prepareRow,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
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
      ]);
    },
  );

  return (
    <TableWrapper {...getTableProps()} className="table">
      <SheduleHeader>
        <SheduleTitle> Shedule </SheduleTitle>
        {' '}
        <Legend />
      </SheduleHeader>
      <TableHeader>
        {headerGroups.map((headerGroup) => (
          <TableHeaderRow className="tr" {...headerGroup.getHeaderGroupProps({})}>
            {headerGroup.headers.map((column) => (
              <span className="th" key={column.id}>
                {column.render('Header')}
              </span>
            ))}
          </TableHeaderRow>
        ))}
      </TableHeader>
      <TableBody className="tbody">
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()} className="tr">
              {row.cells.map((cell) => (
                <span className="td" key={CreateUUID()}>
                  {cell.render('Cell')}
                </span>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </TableWrapper>
  );
}
