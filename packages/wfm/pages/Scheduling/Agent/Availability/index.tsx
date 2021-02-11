import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import { getAgentAvailability } from './fake-data';
import { Message } from '@cx/components/Message';
import { TableContainer } from '@cx/components/DataTable/TableContainer';
import { DataTable } from '@cx/components/DataTable';

const Container = styled.div`
  grid-area: list;
  padding: 15px;
`;

const agentId = 'b47027e0-1126-11ea-953d-9bdc6d6573af';

export function Availability() {
  const { data, isLoading, error } = useQuery(
    'fetchAgentAvailability',
    async () =>
      getAgentAvailability(agentId)
        .then((result: any) => result.data)
        .catch((err) => {
          console.error(err);
          throw err;
        }),
    {
      refetchInterval: 30000,
    }
  );

  const formatColumn = ({ value }: any) => {
    if (!value) {
      return 'UNAVAILABLE';
    }
    return `${value.start} - ${value.end}`;
  };

  const columns = [
    { Header: 'Sunday', accessor: 'sunday', Cell: formatColumn },
    { Header: 'Monday', accessor: 'monday', Cell: formatColumn },
    { Header: 'Tuesday', accessor: 'tuesday', Cell: formatColumn },
    { Header: 'Wednesday', accessor: 'wednesday', Cell: formatColumn },
    { Header: 'Thursday', accessor: 'thursday', Cell: formatColumn },
    { Header: 'Friday', accessor: 'friday', Cell: formatColumn },
    { Header: 'Saturday', accessor: 'saturday', Cell: formatColumn },
  ];

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
      <TableContainer>
        <DataTable
          columns={columns}
          data={memoData}
          showPagination={false}
          loading={isLoading}
        />
      </TableContainer>
    </Container>
  );
}
