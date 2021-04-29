import * as React from 'react';
import styled from 'styled-components';
import { DatePicker } from '../DateTime/DatePicker';
import Arrow from '@material-ui/icons/ArrowRightAlt';
import { addDays } from '@cx/utilities/date';
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

export const DateRange: React.FC<any> = ({ startDateTime, endDateTime, combinedOnchanges }) => {

  const start = DateTime.fromISO(startDateTime);
  const startInJS = start.toJSDate();
  const end = DateTime.fromISO(endDateTime);
  const endInJS = end.toJSDate();

  const diffInDays = end.diff(start, 'days');
  const { days } = diffInDays.toObject();

  const rangeMap = {
    0: 'day',
    1: 'twoDays',
    6: 'week',
  };
  // @ts-ignore
  const selectedRange = rangeMap[days] || 'range';

  const changeRange = (rangeType: string) => {

    const changeKey = `${selectedRange}-${rangeType}`;

    const descisionMatrix = {
      'day-day': () => { return },
      'day-twoDays': () => combinedOnchanges([null, addDays(end, 1)]),
      'day-week': () => combinedOnchanges([null, addDays(end, 6)]),
      'day-range': () => combinedOnchanges([null, addDays(end, 14)]),

      'twoDays-day': () => combinedOnchanges([null, addDays(start, 0)]),
      'twoDays-twoDays': () => { return },
      'twoDays-week': () => combinedOnchanges([null, addDays(end, 5)]),
      'twoDays-range': () => combinedOnchanges([null, addDays(end, 13)]),

      'week-day': () => combinedOnchanges([null, addDays(start, 0)]),
      'week-twoDays': () => combinedOnchanges([null, addDays(start, 1)]),
      'week-week': () => { return },
      'week-range': () => combinedOnchanges([null, addDays(end, 8)]),

      'range-day': () => combinedOnchanges([null, addDays(start, 0)]),
      'range-twoDays': () => combinedOnchanges([null, addDays(start, 1)]),
      'range-week': () => combinedOnchanges([null, addDays(start, 6)]),
      'range-range': () => { return },
    };
    // @ts-ignore
    descisionMatrix[changeKey]();
  }

  const handleDates = (e: Date, dateType: 'startDate' | 'endDate') => {
    if (dateType === 'startDate') {
      combinedOnchanges([e, null]);
    } else {
      combinedOnchanges([null, e]);
    }
  }

  const dateRangeVal = dateOptions.find(({id}) => id === selectedRange )?.id || '';

  const timeSpanChange = ({target: {value}}: React.ChangeEvent<{ value: string }>) =>
    changeRange(value);

  return <>

    <DateFields>
      <Selector
        // label="Time Span"
        value={dateRangeVal}
        options={dateOptions}
        onChange={timeSpanChange}
        // @ts-ignore
        style={{width: '135px'}}
      />

      <StyledDatePicker
        selected={startInJS}
        onChange={(e: Date) => handleDates(e, 'startDate')}
      />

      {selectedRange !== 'day' &&
        <>
          <StyledArrow />
          <StyledDatePicker
            selected={endInJS}
            onChange={(e: Date) => handleDates(e, 'endDate')}
            disabled={selectedRange === 'twoDays' || selectedRange === 'week'}
          />
        </>
      }

    </DateFields>
  </>
};
