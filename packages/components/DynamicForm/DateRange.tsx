import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Controller, Control } from 'react-hook-form';
import { DatePicker } from '../DateTime/DatePicker';
import { DateTime } from 'luxon';

interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: unknown;
  name: string;
};

const MiniDate = styled.span`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  margin: 5px 0;
`;
const RangeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  justify-items: center;
`;

const formatDate = (date: any) => DateTime.fromJSDate(date).toFormat('yyyy-LL-dd');

export const DateRange: React.VFC<Props> = ({control, name, isFormSubmitting, defaultValue}) =>
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ onChange }) => (
      <DatePickers onChange={onChange} name={name} />
    )}
  />;

const DatePickers = ({onChange, name}: any) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    onChange({ startDate: formatDate(startDate), endDate: formatDate(endDate) })
  }, [startDate, endDate]);

  return (
    <RangeContainer>
      <div style={{margin: '20px 0', width: '100%'}}>
        <MiniDate>
          <span>Start Date</span>
          <DatePicker
            className={name + 'startDate'}
            selected={startDate}
            onChange={(date: any) => { setStartDate(date) }}
          />
        </MiniDate>
        <MiniDate>
          <span>End Date</span>
          <DatePicker
            className={name + 'endDate'}
            selected={endDate}
            onChange={(date: any) => { setEndDate(date) }}
          />
        </MiniDate>
      </div>
    </RangeContainer>
  );
};