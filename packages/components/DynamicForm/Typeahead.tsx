import * as React from 'react';
import { useEffect, useState } from 'react';

import { Controller, Control } from 'react-hook-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: any;
  name: string;
  choices: unknown[];
};

export const TypeaheadInput: React.VFC<Props> = ({control, name, isFormSubmitting, defaultValue, choices}) => {

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ onChange, onBlur, value }) => (
        <Typeahead
          defaultValue={defaultValue}
          choices={choices}
          onChange={ onChange }
        />
      )}
    />
  )
};

const Typeahead = ({onChange, defaultValue, choices}: any) => {
  let choicesFromState;
  if (typeof choices === "function") {
    choicesFromState = choices();
  }

  const [selected, setSelected] = useState();

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <Autocomplete
      id="choose_scenario"
      options={ choicesFromState || choices }
      getOptionLabel={(option: any) => option.label}
      size="small"
      getOptionSelected={(option, value) => option.id === value.id}
      style={{ width: 275, display: 'inline-block', marginLeft: '20px' }}
      renderInput={(params: any) => <TextField {...params} label="Scenarios" variant="outlined" />}
      onChange={(e, option: any) => onChange(option.id) && setSelected(option)}
    />
  )
}