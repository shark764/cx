import * as React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { useQuery } from 'react-query';
import { Message } from '@cx/components/Message';
import { TableContainer, DataTable } from '@cx/components/DataTable';

import { Wrapper } from '@cx/components/Styled';
import { getAgents } from '../fake-data';
import { DataContext } from '../context';

const ListWrapper = styled(Wrapper)`
  grid-column: 1;
`;

export function List() {
  const { setFormState }: any = React.useContext(DataContext);

  const { data, isLoading, error } = useQuery(
    'fetchAgents',
    async () => getAgents()
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
      {
        Header: 'Name',
        accessor: 'name',
        disableFilters: false,
        filter: 'fuzzyText',
      },
      { Header: 'Email', accessor: 'email' },
      {
        Header: 'Organization',
        accessor: 'team',
        disableFilters: false,
      },
      {
        Header: 'Date of Employment',
        accessor: 'employmentDate',
        Cell: ({ value }: any) => DateTime.fromJSDate(value).toLocaleString(DateTime.DATE_MED),
      },
      {
        Header: 'End of Employment',
        accessor: 'employmentEndDate',
        Cell: ({ value }: any) => (value ? DateTime.fromJSDate(value).toLocaleString(DateTime.DATE_MED) : ''),
      },
      { Header: 'Timezone', accessor: 'timezone' },
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

  const setSelectedRow = (row: any) => {
    setFormState(row, true);
  };

  return (
    <ListWrapper>
      <TableContainer>
        <DataTable columns={columns} data={memoData} loading={isLoading} setSelectedRow={setSelectedRow} />
      </TableContainer>
    </ListWrapper>
  );
}
