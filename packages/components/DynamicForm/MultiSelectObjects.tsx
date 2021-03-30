import * as React from 'react';
import { useEffect, useState } from 'react';
import { Controller, Control } from 'react-hook-form';
import Select from 'react-select'

interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: any;
  name: string;
  choices: unknown[];
};

export const MultiSelectObjectInput: React.VFC<Props> = ({control, name, isFormSubmitting, defaultValue, choices}) => {



  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ onChange, onBlur, value }) => (
        <Selector
          defaultValue={defaultValue}
          choices={choices}
          onChange={ onChange }
        />
      )}
    />
  )
};

const Selector = ({onChange, defaultValue, choices}: any) => {

  const [selected, setSelected] = useState(defaultValue);

  return <Select
    options={choices}
    isMulti
    value={selected}
    onChange={ onChange }
  />

}