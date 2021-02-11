import * as React from 'react';
import { useQuery } from 'react-query';

import { Message } from '@cx/components/Message';
import { TableContainer, DataTable } from '@cx/components/DataTable';

import { Wrapper } from '@cx/components/Styled';
import { getAgentAvailability } from '@cx/fakedata/agentAvailability';

const agentId = 'b47027e0-1126-11ea-953d-9bdc6d6573af';

export function Availability() {
  const { data, isLoading, error } = useQuery(
    'fetchAgentAvailability',
    async () => getAgentAvailability(agentId)
      .then((result: any) => result.data)
      .catch((err) => {
        console.error(err);
        throw err;
      }),
    {
      refetchInterval: 30000,
    },
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
    <Wrapper>
      <TableContainer>
        <DataTable columns={columns} data={memoData} loading={isLoading} />
      </TableContainer>
    </Wrapper>
  );
}
