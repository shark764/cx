import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Message } from '@cx/components/Message';
import { TableContainer, DataTable } from '@cx/components/DataTable';

import { CheckMark } from '@cx/components/Icons/CheckMark';
import { Dot } from '@cx/components/Icons/Dot';
import { Label, Title, Wrapper } from '@cx/components/Styled';
import { getCompetencies, humanizeQueue } from '@cx/fakedata/planningEmployeesCompetencies';
import { IQuery } from '@cx/types';
// @ts-ignore
import { DateTime } from 'luxon';
import { DatePicker } from '@cx/components/DateTime/DatePicker';
import { useFormState } from 'context/RowSelection';
import { Legend } from './Legend';

const TeamLeaderCell = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ListWrapper = styled.div`
  grid-column: 1;
  gap: 15px;
  display: grid;
  grid-auto-rows: max-content auto;
`;

const Toolbar = styled.div`
  width: max-content;
  padding: 0 1rem;
  display: grid;
  gap: 8px;
  grid-template-columns: max-content min-content min-content;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export function List() {

  const {
    setFormState,
  }: any = useFormState();

  const [calDate, setCalDate] = React.useState(new Date());

  const fromDate = DateTime.fromJSDate(calDate)
    .startOf('day')
    .toISO();

  const { data, isLoading, error }: IQuery = useQuery(
    ['fetchCompetencies', fromDate],
    async () => getCompetencies(fromDate)
      .then((result: any) => result.data)
      .catch((err: Error) => {
        console.error(err);
        throw err;
      }),
    {
      refetchInterval: 30000,
    },
  );

  const columns = React.useMemo(() => {
    const staticColumns = [
      {
        Header: 'Name',
        accessor: 'name',
        disableFilters: false,
        filter: 'fuzzyText',
      },
      {
        Header: 'Admin',
        accessor: 'admin',
        Cell: ({ value }: any) => (value ? <CheckMark size={15} /> : ''),
      },
      {
        Header: 'Back Office',
        accessor: 'backOffice',
        Cell: ({ value }: any) => (value ? <CheckMark size={15} /> : ''),
      },
      {
        Header: 'Team Leader',
        accessor: 'teamLeader',
        Cell: ({ row, value }: any) => {
          const checkMark = value ? <CheckMark size={15} /> : null;
          const dotMark = row.original.teamLeaderFutureChange ? <Dot size={15} /> : null;
          return (
            <TeamLeaderCell>
              {checkMark}
              {dotMark}
            </TeamLeaderCell>
          );
        },
      },
    ];

    if (isLoading && !data) {
      return staticColumns;
    }
    if (data.length > 0) {
      const dynamicColumns = Object.keys(data[0])
        .filter((k) => k.startsWith('queue-'))
        .map((k) => ({
          Header: humanizeQueue(k),
          accessor: k,
          Cell: ({ value }: any) => (value ? <CheckMark size={15} /> : ''),
        }));

      return [...staticColumns, ...dynamicColumns];
    }
    return staticColumns;
  }, [isLoading, data]);

  const memoData = React.useMemo(() => {
    if (isLoading && !data) {
      return [];
    }
    return data;
  }, [isLoading, data]);

  const onTableRowSelection = ({ original }: any) => {
    setFormState(original, true);
  };

  if (error) {
    return <Message text={error.message} messageType="error" />;
  }

  return (
    <ListWrapper>
      <Wrapper>
        <Title>Competency List Filters</Title>

        <Label>Date From</Label>
        <Toolbar>
          <DatePicker
            selected={calDate}
            onChange={setCalDate}
          />
        </Toolbar>
      </Wrapper>

      <Wrapper>
        <Header>
          <Title>Competencies</Title>
          <Legend />
        </Header>
        <TableContainer>
          <DataTable
            columns={columns}
            data={memoData}
            loading={isLoading}
            onTableRowSelection={onTableRowSelection}
            oneRowSelectable
            key={columns.length}
          />
        </TableContainer>
      </Wrapper>
    </ListWrapper>
  );
}
