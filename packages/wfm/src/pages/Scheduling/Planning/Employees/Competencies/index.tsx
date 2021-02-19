import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Message } from '@cx/components/Message';
import { TableContainer, DataTable } from '@cx/components/DataTable';

import { CheckMark } from '@cx/components/Icons/CheckMark';
import { Dot } from '@cx/components/Icons/Dot';
import { Wrapper } from '@cx/components/Styled';
import { getCompetencies, humanizeQueue } from '@cx/fakedata/planningEmployeesCompetencies';

const TeamLeaderCell = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  display: grid;
  grid-auto-columns: 2fr 1fr;
  gap: 15px;
`;

const ListWrapper = styled(Wrapper)`
  grid-column: 1;
`;
const FormWrapper = styled(Wrapper)`
  grid-column: 2;
`;

export function Competencies() {
  const [open, setOpen] = React.useState(false);

  const { data, isLoading, error } = useQuery(
    'fetchCompetencies',
    async () => getCompetencies()
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
        Cell: ({ value }: any) => (value ? <CheckMark size={15} primary /> : ''),
      },
      {
        Header: 'Back Office',
        accessor: 'backOffice',
        Cell: ({ value }: any) => (value ? <CheckMark size={15} primary /> : ''),
      },
      {
        Header: 'Team Leader',
        accessor: 'teamLeader',
        Cell: ({ row, value }: any) => {
          const checkMark = value ? <CheckMark size={15} primary /> : null;
          const dotMark = row.original.teamLeaderFutureChange ? <Dot size={15} primary /> : null;
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
          Cell: ({ value }: any) => (value ? <CheckMark size={15} primary /> : ''),
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

  if (error) {
    return <Message text="error" messageType="error" />;
  }

  return (
    <Container>
      <button type="button" onClick={() => setOpen((isOpen: boolean) => !isOpen)}>
        Open
      </button>

      <ListWrapper>
        <TableContainer>
          <DataTable columns={columns} data={memoData} loading={isLoading} key={columns.length} />
        </TableContainer>
      </ListWrapper>

      {open && (
        <FormWrapper>
          <span>Form</span>
        </FormWrapper>
      )}
    </Container>
  );
}
