import * as React from 'react';
import styled, { useTheme } from 'styled-components';
import { useQuery } from 'react-query';
import { Message } from '@cx/components/Message';
import { TableContainer, DataTable } from '@cx/components/DataTable';

import { CheckMark } from '@cx/components/Icons/CheckMark';
import { Dot } from '@cx/components/Icons/Dot';
import { Wrapper } from '@cx/components/Styled';
import { getCompetencies, humanizeQueue } from '@cx/fakedata/planningEmployeesCompetencies';
import { IQuery } from '@cx/types';
import { DateTime } from 'luxon';
import { DatePicker } from '@cx/components/DateTime/DatePicker';
import { Play } from '@cx/components/Icons/Play';
import { addDays } from '@cx/utilities/date';
import { Calendar } from '@cx/components/Icons/Calendar';
import { useFormState } from 'context/RowSelection';

const TeamLeaderCell = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ListWrapper = styled(Wrapper)`
  grid-column: 1;
`;

const Toolbar = styled.div`
  width: max-content;
  padding: 1rem;
  display: grid;
  gap: 8px;
  grid-template-columns: max-content min-content min-content;
`;
const DatePickerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: 1rem;
`;
const PlayIcon = styled(Play)`
  margin: auto;
  line-height: normal;
`;
const CalendarIcon = styled(Calendar)`
  margin: auto;
  line-height: normal;
  margin-left: 0.5rem;
`;

export function List() {
  const theme: any = useTheme();

  const {
    selectedRow: [selected],
    setFormState,
  }: any = useFormState();

  const [calDate, setCalDate] = React.useState(new Date());
  const [datePickerIsOpen, setDatePickerIsOpen] = React.useState(false);

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
        Cell: ({ value }: any) => (value ? <CheckMark size={15} fill={theme.colors.primary} /> : ''),
      },
      {
        Header: 'Back Office',
        accessor: 'backOffice',
        Cell: ({ value }: any) => (value ? <CheckMark size={15} fill={theme.colors.primary} /> : ''),
      },
      {
        Header: 'Team Leader',
        accessor: 'teamLeader',
        Cell: ({ row, value }: any) => {
          const checkMark = value ? <CheckMark size={15} fill={theme.colors.primary} /> : null;
          const dotMark = row.original.teamLeaderFutureChange ? <Dot size={15} fill={theme.colors.primary} /> : null;
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
          Cell: ({ value }: any) => (value ? <CheckMark size={15} fill={theme.colors.primary} /> : ''),
        }));

      return [...staticColumns, ...dynamicColumns];
    }
    return staticColumns;
  }, [isLoading, data, selected]);

  const memoData = React.useMemo(() => {
    if (isLoading && !data) {
      return [];
    }
    return data;
  }, [isLoading, data]);

  const onTableRowSelection = ({ original }: any) => {
    console.log('onTableRowSelection', original);

    setFormState(original, true);
  };

  const handleManuallyAddDays = (days: number) => {
    setCalDate((currentDate) => addDays(currentDate, days));
  };

  if (error) {
    return <Message text={error.message} messageType="error" />;
  }

  return (
    <ListWrapper>
      <Toolbar>
        <DatePickerContainer>
          <DatePicker
            selected={calDate}
            onChange={setCalDate}
            // locale="en-US"
            open={datePickerIsOpen}
            onFocus={() => setDatePickerIsOpen(true)}
            onClickOutside={() => setDatePickerIsOpen(false)}
            isClearable
          />

          <CalendarIcon fill={theme.colors.secondary} onClick={() => setDatePickerIsOpen(true)} title="Open calendar" />
        </DatePickerContainer>

        <PlayIcon
          fill={theme.colors.secondary}
          direction="left"
          onClick={() => handleManuallyAddDays(-1)}
          title="Previous day"
        />
        <PlayIcon fill={theme.colors.secondary} onClick={() => handleManuallyAddDays(1)} title="Next day" />
      </Toolbar>

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
    </ListWrapper>
  );
}
