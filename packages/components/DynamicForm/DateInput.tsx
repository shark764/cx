import * as React from 'react';
import { useState, useEffect} from 'react';
import { Controller, Control } from 'react-hook-form';
import { DateTime } from 'luxon';
import { DatePicker } from '@cx/components/DateTime/DatePicker';

interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: unknown;
  name: string;
};

const formatDate = (date: any) => DateTime.fromJSDate(date).toFormat('yyyy-LL-dd');

export const DateInput: React.VFC<Props> = ({control, name, isFormSubmitting, defaultValue}) =>
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ onChange, onBlur, value }) => (
      <Date
        onChange={onChange}
        isFormSubmitting={isFormSubmitting}
      />
    )}
  />;

  const Date = ({onChange, isFormSubmitting}: any) => {
    const [date, setDate] = useState(null);

    useEffect(() => {
      onChange( formatDate(date) )
    }, [date]);

    return (
      <DatePicker
        onChange={setDate}
        selected={date}
        isClearable
        calendarBtn
        disabled={isFormSubmitting}
      />
    );
  };