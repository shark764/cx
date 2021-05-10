import * as React from 'react';
import styled from 'styled-components';
// @ts-ignore
import { DateTime } from 'luxon';
import { useQuery } from 'react-query';
import { Message } from '@cx/components/Message';
import { TableContainer, DataTable } from '@cx/components/DataTable';

import { Title, Wrapper } from '@cx/components/Styled';
import { getAgents } from '@cx/fakedata/planningEmployeesAgents';
import { useFormState } from 'context/RowSelection';
import { ISingleRowFormContext } from '@cx/types/form';

const ListWrapper = styled(Wrapper)`
  grid-column: 1;
`;

export function List() {
  const {
    setFormState,
  }: ISingleRowFormContext = useFormState();

  const { data, isLoading, error } = useQuery<any, Error>('fetchAgents', getAgents);

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

  const memoData = React.useMemo(() => data || [], [data]);

  const onTableRowSelection = ({ original }: any) => {
    setFormState(original, true);
  };

  if (error) {
    return <Message text={error.message} messageType="error" />;
  }

  return (
    <ListWrapper>
      <Title>Agents Information</Title>
      <TableContainer>
        <DataTable
          columns={columns}
          data={memoData}
          loading={isLoading}
          onTableRowSelection={onTableRowSelection}
          oneRowSelectable
        />
      </TableContainer>
    </ListWrapper>
  );
}
