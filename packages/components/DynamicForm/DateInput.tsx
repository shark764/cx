import * as React from 'react';
import { Controller, Control } from 'react-hook-form';
import { DatePicker } from '@cx/components/DateTime/DatePicker';

interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: unknown;
  name: string;
};

export const DateInput: React.VFC<Props> = ({control, name, isFormSubmitting, defaultValue}) =>
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ onChange, onBlur, value }) => (
      <DatePicker
        onChange={onChange}
        onBlur={onBlur}
        selected={value}
        isClearable
        calendarBtn
        disabled={isFormSubmitting}
      />
    )}
  />;