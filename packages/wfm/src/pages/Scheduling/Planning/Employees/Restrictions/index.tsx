import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Message } from '@cx/components/Message';
import { TableContainer, DataTable } from '@cx/components/DataTable';

import { CheckMark } from '@cx/components/Icons/CheckMark';
import { Dot } from '@cx/components/Icons/Dot';
import { Wrapper } from '@cx/components/Styled';
import { getRestrictions } from '@cx/fakedata/planningEmployeesRestrictions';

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

export function Restrictions() {
  const [open, setOpen] = React.useState(false);

  const { data, isLoading, error } = useQuery(
    'fetchRestrictions',
    async () => getRestrictions()
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
      { Header: 'Name', accessor: 'name' },
      {
        Header: 'Default Restriction Set',
        accessor: 'defaultSet',
        Cell: ({ value }: any) => (value ? <CheckMark size={15} primary /> : ''),
      },
      { Header: 'Agreed Hours Per Week', accessor: 'agreedHours' },
      { Header: 'Min Hours Per Week', accessor: 'minHours' },
      { Header: 'Max Hours Per Week', accessor: 'maxHours' },
      { Header: 'Min Shifts Per Week', accessor: 'minShift' },
      {
        Header: 'Max Shifts Per Week',
        accessor: 'maxShift',
        Cell: ({ row, value }: any) => {
          const dotMark = row.original.maxShiftFutureChange ? <Dot size={15} primary /> : null;
          return (
            <TeamLeaderCell>
              {value}
              {dotMark}
            </TeamLeaderCell>
          );
        },
      },
      { Header: 'Min Shift Length', accessor: 'minShiftLength' },
      { Header: 'Max Shift Length', accessor: 'maxShiftLength' },
      { Header: 'Max Consecutive Working Days', accessor: 'maxWorkDays' },
      { Header: 'Max Consecutive Weekends', accessor: 'maxWeekends' },
      { Header: 'Min Hours Week Rest', accessor: 'minWeekRest' },
      { Header: 'Min Hours Night Rest', accessor: 'minNightRest' },
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

      <ListWrapper>
        <TableContainer>
          <DataTable columns={columns} data={memoData} loading={isLoading} />
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
