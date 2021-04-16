import * as React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { DatePicker } from '../DateTime/DatePicker';
import Arrow from '@material-ui/icons/ArrowRightAlt';
import { reactSelectStyles } from '../reactSelectStyles';
import { addDays } from '@cx/utilities/date';
import { DateTime } from 'luxon';

const StyledDatePicker = styled(DatePicker)`
  margin-left: 5px;
`;

export const dateOptions = [
  { label: 'Day', type: 'day' },
  { label: 'Two Days', type: 'twoDays' },
  { label: 'Week', type: 'week' },
  { label: 'Date Range', type: 'range' },
];

const SelectTimeSpanSized = styled(Select)`
  width: 140px;
  display: inline-block;
  margin: 0px 10px;
`;

const Label = styled.span`
  font-size: 11px;
  color: grey;
  vertical-align: super;
  margin-left: 10px;
`;

const DateFields = styled.span`
  display: grid;
  align-items: center;
  grid-template-columns: 200px 200px 50px 200px;
  height: 50px;
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
      'day-range': () => combinedOnchanges([null, addDays(end, 13)]),

      'twoDays-day': () => combinedOnchanges([null, addDays(start, 0)]),
      'twoDays-twoDays': () => { return },
      'twoDays-week': () => combinedOnchanges([null, addDays(end, 5)]),
      'twoDays-range': () => combinedOnchanges([null, addDays(end, 5)]),

      'week-day': () => combinedOnchanges([null, addDays(start, 0)]),
      'week-twoDays': () => combinedOnchanges([null, addDays(start, 1)]),
      'week-week': () => { return },
      'week-range': () => combinedOnchanges([null, addDays(end, 7)]),

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

  const dateRangeVal = dateOptions.find(({type}) => type === selectedRange );
  return <span>
    <Label> Time Span </Label>
    <DateFields>

      <SelectTimeSpanSized
        className="choose-date-range"
        classNamePrefix="select"
        value={dateRangeVal}
        options={dateOptions}
        onChange={({ type }: { type: string }) => changeRange(type)}
        styles={reactSelectStyles}
      />

      <StyledDatePicker
        selected={startInJS}
        onChange={(e: Date) => handleDates(e, 'startDate')}
      />

      {selectedRange !== 'day' &&
        <>
          <Arrow style={{ color: 'grey', transform: 'scale(1.5)', margin: '0 auto' }} />
          <StyledDatePicker
            selected={endInJS}
            onChange={(e: Date) => handleDates(e, 'endDate')}
            disabled={selectedRange === 'twoDays' || selectedRange === 'week'}
          />
        </>
      }

    </DateFields>
  </span>
};
