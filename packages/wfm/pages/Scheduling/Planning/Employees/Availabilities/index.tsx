import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Message } from '@cx/components/Message';
import { TableContainer, DataTable } from '@cx/components/DataTable';

import { CheckMark } from '@cx/components/Icons/CheckMark';
import { Dot } from '@cx/components/Icons/Dot';
import { Wrapper } from '@cx/components/Styled';
import { getAvailabilities } from './fake-data';

const Container = styled.div`
  display: grid;
  grid-auto-columns: 1fr 2fr 2fr;
  gap: 15px;
`;

const ListWrapper = styled(Wrapper)`
  grid-column: 1;
`;
const TimeTableWrapper = styled(Wrapper)`
  grid-column: 2;
`;
const FormWrapper = styled(Wrapper)`
  grid-column: 3;
`;

const TeamLeaderCell = styled.div`
  display: flex;
  justify-content: space-between;
`;

export function Availabilities() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const { data, isLoading, error } = useQuery(
    'fetchAvailabilities',
    async () => getAvailabilities()
      .then((result: any) => result.data)
      .catch((err: Error) => {
        console.error(err);
        throw err;
      }),
    {
      refetchInterval: 30000,
    },
  );

  const columns = React.useMemo(
    () => [
      { Header: 'Agent', accessor: 'agent' },
      { Header: 'Agreed Hours', accessor: 'agreedHours' },
    ],
    [],
  );

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
      <button type="button" onClick={() => setOpen2((isOpen: boolean) => !isOpen)}>
        Open 2
      </button>

      <ListWrapper>
        <TableContainer>
          <DataTable columns={columns} data={memoData} loading={isLoading} />
        </TableContainer>
      </ListWrapper>

      {open && (
        <TimeTableWrapper>
          <span>TimeTable</span>
        </TimeTableWrapper>
      )}

      {open2 && (
        <FormWrapper>
          <span>Form</span>
        </FormWrapper>
      )}
    </Container>
  );
}
