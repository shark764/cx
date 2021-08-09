import * as React from 'react';
import { Controller, Control } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';

interface Option {
  label: string,
  value: string
};

interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: { label: string, value: string };
  name: string;
  choices: Option[];
};

export const AutoComplete: React.VFC<Props> = ({control, name, defaultValue, choices}) => {

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ onChange, value }) => (
        <Selector
          defaultValue={defaultValue}
          choices={choices}
          onChange={ onChange }
          name={name}
          value={value}
        />
      )}
    />
  )
};

const Selector = ({onChange, choices, name, value}: any) => {

  return <Autocomplete
    id={`select-${name}`}
    value={value}
    onChange={(event, newValue) => {
      onChange(newValue);
    }}
    options={choices}
    getOptionLabel={(option: Option) => option.label}
    isOptionEqualToValue={(a, b) => a.value === b.value }
    style={{ minWidth: 200 }}
    renderInput={(params: any) => (
      <TextField size="small" {...params} label=""/>
    )}
  />

}