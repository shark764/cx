import * as React from 'react';
import { Controller, Control } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: unknown;
  name: string;
  hidden?: boolean;
  constraints?: any;
  errors?: any
};
export const NumberInput: React.VFC<Props> = ({control, name, defaultValue, constraints, errors}) =>
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    rules={{
      validate: {
        required: (value) => !!value || constraints?.[name]?.required,
      }
    }}
    render={({ onChange, onBlur, value }) => (
      <TextField
        type="number"
        error={ Boolean(errors[name]) }
        helperText={errors?.[name]?.message}
        value={value || ''}
        className={`${name}-textbox`}
        variant="outlined"
        onChange={onChange}
        onBlur={onBlur}
        size="small"
        sx={{width: '85%'}}
      />
    )}
  />;