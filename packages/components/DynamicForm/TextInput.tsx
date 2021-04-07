import * as React from 'react';
import styled from 'styled-components';
import { Controller, Control } from 'react-hook-form';

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  border-radius: 4px;
  border: 1px solid hsl(0,0%,80%);
  padding: 10px 15px;
  outline: none;
`;


interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: unknown;
  name: string;
  hidden?: boolean;
};
export const TextInput: React.VFC<Props> = ({control, name, isFormSubmitting, defaultValue}) =>
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ onChange, onBlur, value }) => (
      <Input
        value={value}
        className={name}
        onChange={onChange}
        onBlur={onBlur}
        disabled={isFormSubmitting}
      />
    )}
  />;