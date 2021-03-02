import * as React from 'react';
import styled, { useTheme } from 'styled-components';
import { useQuery } from 'react-query';
import { Message } from '@cx/components/Message';
import { TableContainer, DataTable } from '@cx/components/DataTable';

import { CheckMark } from '@cx/components/Icons/CheckMark';
import { Dot } from '@cx/components/Icons/Dot';
import { Label, Title, Wrapper } from '@cx/components/Styled';
import { getRestrictions } from '@cx/fakedata/planningEmployeesRestrictions';
import { IQuery } from '@cx/types';
import { Play } from '@cx/components/Icons/Play';
import { Calendar } from '@cx/components/Icons/Calendar';
import { DateTime } from 'luxon';
import { DatePicker } from '@cx/components/DateTime/DatePicker';
import { addDays } from '@cx/utilities/date';
import { useFormState } from 'context/MultipleRowSelection';
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
const DefaultRestrictionRow = styled.span`
  font-weight: bolder;
  color: ${({ theme }) => theme.colors.primary};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

/**
 * Apply primary style to Default Restriction Set
 */
const formatRow = ({ row, value }: any) => (row.original.isDefault ? <DefaultRestrictionRow>{value}</DefaultRestrictionRow> : value);

export function List() {
  const theme: any = useTheme();

  const {
    selectedRows: [selected],
    onRowSelection,
    defaultRestriction: [, setDefaultRestriction],
  }: any = useFormState();

  const [calDate, setCalDate] = React.useState(new Date());
  const [datePickerIsOpen, setDatePickerIsOpen] = React.useState(false);

  const fromDate = DateTime.fromJSDate(calDate)
    .startOf('day')
    .toISO();

  const { data, isLoading, error }: IQuery = useQuery(
    ['fetchRestrictions', fromDate],
    async () => getRestrictions(fromDate)
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
      { Header: 'Name', accessor: 'name', Cell: formatRow },
      {
        Header: 'Default Restriction Set',
        accessor: 'defaultSet',
        Cell: ({ value }: any) => (value ? <CheckMark size={15} fill={theme.colors.primary} /> : ''),
      },
      {
        Header: 'Agreed Hours Per Week',
        accessor: 'agreedHours',
        Cell: formatRow,
      },
      { Header: 'Min Hours Per Week', accessor: 'minHours', Cell: formatRow },
      { Header: 'Max Hours Per Week', accessor: 'maxHours', Cell: formatRow },
      { Header: 'Min Shifts Per Week', accessor: 'minShift', Cell: formatRow },
      {
        Header: 'Max Shifts Per Week',
        accessor: 'maxShift',
        Cell: ({ row, value }: any) => {
          const dotMark = row.original.maxShiftFutureChange ? <Dot size={15} fill={theme.colors.primary} /> : null;
          return (
            <TeamLeaderCell>
              {formatRow({ row, value })}
              {dotMark}
            </TeamLeaderCell>
          );
        },
      },
      {
        Header: 'Min Shift Length',
        accessor: 'minShiftLength',
        Cell: formatRow,
      },
      {
        Header: 'Max Shift Length',
        accessor: 'maxShiftLength',
        Cell: formatRow,
      },
      {
        Header: 'Max Consecutive Working Days',
        accessor: 'maxWorkDays',
        Cell: formatRow,
      },
      {
        Header: 'Max Consecutive Weekends',
        accessor: 'maxWeekends',
        Cell: formatRow,
      },
      {
        Header: 'Min Hours Week Rest',
        accessor: 'minWeekRest',
        Cell: formatRow,
      },
      {
        Header: 'Min Hours Night Rest',
        accessor: 'minNightRest',
        Cell: formatRow,
      },
    ],
    [selected],
  );

  const memoData = React.useMemo(() => {
    if (isLoading && !data) {
      return [];
    }
    return data;
  }, [isLoading, data]);

  React.useEffect(() => {
    const dfRestriction = memoData.find((item: any) => item.isDefault) || {};
    setDefaultRestriction(dfRestriction);
  }, [memoData, setDefaultRestriction]);

  const onTableRowSelection = ({ original }: any) => {
    onRowSelection(original);
  };

  const handleManuallyAddDays = (days: number) => {
    setCalDate((currentDate) => addDays(currentDate, days));
  };

  if (error) {
    return <Message text={error.message} messageType="error" />;
  }

  return (
    <ListWrapper>
      <Wrapper>
        <Title>Restriction List Filters</Title>

        <Label>Date From</Label>
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

            <CalendarIcon
              fill={theme.colors.secondary}
              onClick={() => setDatePickerIsOpen(true)}
              title="Open calendar"
            />
          </DatePickerContainer>

          <PlayIcon
            fill={theme.colors.secondary}
            direction="left"
            onClick={() => handleManuallyAddDays(-1)}
            title="Previous day"
          />
          <PlayIcon fill={theme.colors.secondary} onClick={() => handleManuallyAddDays(1)} title="Next day" />
        </Toolbar>
      </Wrapper>

      <Wrapper>
        <Header>
          <Title>Restrictions</Title>
          <Legend />
        </Header>
        <TableContainer>
          <DataTable
            columns={columns}
            data={memoData}
            loading={isLoading}
            onTableRowSelection={onTableRowSelection}
            multipleRowSelectable
          />
        </TableContainer>
      </Wrapper>
    </ListWrapper>
  );
}
