import * as React from 'react';
import styled from 'styled-components';
import { DatePicker } from '../DateTime/DatePicker';
import Arrow from '@material-ui/icons/ArrowRightAlt';
import { selectedRangeFn, changeRangeFn } from '@cx/utilities/date';
import { DateTime } from 'luxon';
import { Selector } from '../Inputs/Selector';

const StyledDatePicker = styled(DatePicker)`
  margin-left: 5px;
`;

export const dateOptions = [
  { label: 'Day', id: 'day' },
  { label: 'Two Days', id: 'twoDays' },
  { label: 'Week', id: 'week' },
  { label: 'Date Range', id: 'range' },
];

const StyledArrow = styled(Arrow)`
  color: rgba(128, 128, 128, 0.66);
  transform: scale(1.5);
  margin-left: 15px;
  position: relative;
  top: 0px;
`;

const DateFields = styled.span`
  display: grid;
  align-items: center;
  grid-template-columns: 200px 170px 50px 170px;
`;

interface DateRangeProps {
  startDateTime: string;
  endDateTime: string;
  combinedOnchanges: (dates: any) => any;
};

export const DateRange: React.FC<DateRangeProps> = ({ startDateTime, endDateTime, combinedOnchanges }) => {

  const start = DateTime.fromISO(startDateTime);
  const startInJS = start.toJSDate();
  const end = DateTime.fromISO(endDateTime);
  const endInJS = end.toJSDate();
  const selectedRange = selectedRangeFn(startDateTime, endDateTime);
  const dateRangeVal = dateOptions.find(({ id }) => id === selectedRange)?.id || '';

  const handleDates = (e: Date, dateType: 'startDate' | 'endDate') => {
    const selectedDate = DateTime.fromJSDate(e).toString();

    if (dateType === 'startDate') {
      combinedOnchanges(changeRangeFn(selectedDate, endDateTime, selectedRange, dateType));
    } else {
      combinedOnchanges(changeRangeFn(startDateTime, selectedDate, selectedRange, dateType));
    }

  }

  const timeSpanChange = ({ target: { value } }: React.ChangeEvent<{ value: string }>) => {
    const combinedDates = changeRangeFn(startDateTime, endDateTime, value);
    combinedOnchanges(combinedDates);
  }

  return <>

    <DateFields>
      <Selector
        // label="Time Span"
        value={dateRangeVal}
        options={dateOptions}
        onChange={timeSpanChange}
        // @ts-ignore
        style={{ width: '135px' }}
      />

      <StyledDatePicker
        selected={startInJS}
        onChange={(e: Date) => handleDates(e, 'startDate')}
      />

      {selectedRange !== 'day' &&
        <>
          <StyledArrow />
          <StyledDatePicker
            selected={startInJS >= endInJS ? startInJS : endInJS}
            onChange={(e: Date) => handleDates(e, 'endDate')}
            disabled={selectedRange === 'twoDays' || selectedRange === 'week'}
            minDate={selectedRange === 'range' ? startInJS : undefined}
          />
        </>
      }

    </DateFields>
  </>
};