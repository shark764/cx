import * as React from 'react';
import { Controller, Control } from 'react-hook-form';
import Checkbox from '@material-ui/core/Checkbox';

interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: unknown;
  name: string;
};

export const BooleanInput: React.VFC<Props> = ({control, name, isFormSubmitting, defaultValue}) =>
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ onChange, onBlur, value }) => (
      <Checkbox
        onChange={() => onChange(!value)}
        inputProps={{ 'aria-label': 'primary checkbox' }}
        checked={value}
      />
    )}
  />;