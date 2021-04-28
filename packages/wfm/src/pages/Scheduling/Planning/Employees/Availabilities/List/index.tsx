import * as React from 'react';
import styled, { useTheme } from 'styled-components';
import { useQuery } from 'react-query';
import { Message } from '@cx/components/Message';
import { TableContainer, DataTable } from '@cx/components/DataTable';
import { Title, Wrapper } from '@cx/components/Styled';
import { getAvailabilities } from '@cx/fakedata/planningEmployeesAvailabilities';
import { useFormState } from 'context/RowSelection';
import { Chevron } from '@cx/components/Icons/Chevron';
import { Button } from '@cx/components/Inputs/Button';
import { ISingleRowFormContext } from '@cx/types/form';
import { IExpander } from '@cx/types/table';
import { TimeTable } from '../TimeTable';

const Chevron2 = styled(Chevron)<IExpander>`
  cursor: pointer;
  svg {
    transition: transform 0.4s ease-in-out;
    transform: rotate(${({ isExpanded }) => (isExpanded ? 90 : 0)}deg);
  }
`;

const ListWrapper = styled(Wrapper)`
  grid-column: 1;
`;

const AddButton = styled(Button)`
  padding: 6px 18px;
  border-radius: 4px;
  margin-left: 10px;
`;

export function List() {
  const theme: any = useTheme();

  const {
    selectedRow: [selected],
    setFormState,
  }: ISingleRowFormContext = useFormState();

  const { data, isLoading, error } = useQuery<any, Error>('fetchAvailabilities', getAvailabilities);

  const columns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'expander',
        id: 'expander',
        Cell: ({ row }: any) => (
          <span {...row.getToggleRowExpandedProps()}>
            <Chevron2 size={15} isExpanded={row.isExpanded} />
          </span>
        ),
        SubCell: () => null,
        columnWidth: 40,
      },
      { Header: 'Agent', accessor: 'agent' },
      { Header: 'Agreed Hours', accessor: 'agreedHours' },
    ],
    [selected],
  );

  const memoData = React.useMemo(() => data || [], [data]);

  const renderRowSubComponent = React.useCallback(
    ({ row, rowProps }) => <TimeTable row={row} rowProps={rowProps} />,
    [],
  );

  const onCreate = () => {
    setFormState(
      {
        timetable: {
          weeks: [
            {
              week: 1,
              sundayAvailable: '',
              sundayStart: '',
              sundayEnd: '',
              mondayAvailable: '',
              mondayStart: '',
              mondayEnd: '',
              tuesdayAvailable: '',
              tuesdayStart: '',
              tuesdayEnd: '',
              wednesdayAvailable: '',
              wednesdayStart: '',
              wednesdayEnd: '',
              thursdayAvailable: '',
              thursdayStart: '',
              thursdayEnd: '',
              fridayAvailable: '',
              fridayStart: '',
              fridayEnd: '',
              saturdayAvailable: '',
              saturdayStart: '',
              saturdayEnd: '',
            },
          ],
        },
      },
      true,
    );
  };

  if (error) {
    return <Message text={error.message} messageType="error" />;
  }

  return (
    <ListWrapper>
      <Title>Availabilities</Title>
      <AddButton type="button" label="Create New" onClick={onCreate} primary />

      <TableContainer>
        <DataTable
          columns={columns}
          data={memoData}
          loading={isLoading}
          renderRowSubComponent={renderRowSubComponent}
        />
      </TableContainer>
    </ListWrapper>
  );
}
