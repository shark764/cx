import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Controller, Control } from 'react-hook-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


const FieldError = styled.p`
  color: red;
  font-weight: 400;
  margin-left: 20px;
`;

interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: any;
  name: string;
  choices: unknown[];
  constraints: any;
  errors: any;
};

export const TypeaheadInput: React.VFC<Props> = ({ control, name, constraints, errors, defaultValue, choices }) => {

  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={constraints[name]}
        render={({ onChange, onBlur, value }) => (
          <Typeahead
            defaultValue={defaultValue}
            choices={choices}
            onChange={onChange}
          />
        )}
      />
      <FieldError>{errors[name]?.message}</FieldError>
    </>
  )
};

const Typeahead = ({ onChange, defaultValue, choices }: any) => {
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
      options={choicesFromState || choices}
      getOptionLabel={(option: any) => option.label}
      size="small"
      getOptionSelected={(option, value) => option.id === value.id}
      style={{ width: 275, display: 'inline-block', marginLeft: '20px' }}
      renderInput={(params: any) => <TextField {...params} label="Forecasted Ranges" variant="outlined" />}
      onChange={(e, option: any) => onChange(option.id) && setSelected(option)}
    />
  )
}