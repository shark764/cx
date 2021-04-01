import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { DatePicker } from '../DateTime/DatePicker';
import Arrow from '@material-ui/icons/ArrowRightAlt';
import { reactSelectStyles } from '../reactSelectStyles';
import { addDays } from '@cx/utilities/date';

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
  const [selectedRange, setSelectedRange] = useState('day');
  const [startDate, setStartDate] = useState(startDateTime);
  const [endDate, setEndDate] = useState(endDateTime ? endDateTime : startDate);

  useEffect(() => {
    combinedOnchanges([startDate, endDate]);
  }, [startDate, endDate]);

  useEffect(() => {
    if (selectedRange === 'twoDays' || selectedRange === 'week') {
      const daysToAdd = selectedRange === 'twoDays' ? 1 : 6;
      setEndDate(addDays(startDate, daysToAdd));
    } else {
      setEndDate(addDays(startDate, 0));
    }
  }, [selectedRange]);

  const handleDates = (e: Date, dateType: 'startDate' | 'endDate') => {
    const daysToAdd = (days: number): void => {
      setStartDate(e);
      setEndDate(addDays(e, days));
    };
    const dateMap = {
      day: () => daysToAdd(0),
      twoDays: () => daysToAdd(1),
      week: () => daysToAdd(6),
    };
    if (selectedRange !== 'range') {
      dateMap[selectedRange](e);
    } else {
      if (dateType === 'startDate') {
        setStartDate(e);
        if (e > endDate) {
          setEndDate(e);
        }
      } else if (dateType === 'endDate') {
        setEndDate(e);
      }
    }
  }

  return <span>
    <Label> Time Span </Label>
    <DateFields>

      <SelectTimeSpanSized
        className="choose-date-range"
        classNamePrefix="select"
        defaultValue={dateOptions[0]}
        name="choose-date-range"
        options={dateOptions}
        onChange={({ type }: { type: string }) => setSelectedRange(type)}
        styles={reactSelectStyles}
      />

      <StyledDatePicker
        selected={startDate}
        onChange={(e: Date) => handleDates(e, 'startDate')}
      />

      {selectedRange !== 'day' &&
        <>
          <Arrow style={{ color: 'grey', transform: 'scale(1.5)', margin: '0 auto' }} />
          <StyledDatePicker
            selected={endDate}
            onChange={(e: Date) => handleDates(e, 'endDate')}
            disabled={selectedRange === 'twoDays' || selectedRange === 'week'}
            minDate={selectedRange === 'range' ? startDate : undefined}
          />
        </>
      }

    </DateFields>
  </span>
};
