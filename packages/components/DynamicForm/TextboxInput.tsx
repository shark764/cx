import * as React from 'react';
import styled from 'styled-components';
import { Controller, Control } from 'react-hook-form';

interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: unknown;
  name: string;
};

const Textarea = styled.textarea`
  display: block;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  border-radius: 4px;
  border: 1px solid hsl(0,0%,80%);
  padding: 10px 15px;
  outline: none;
`;

export const TextboxInput: React.VFC<Props> = ({control, name, isFormSubmitting, defaultValue}) =>
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ onChange, onBlur, value }) => (
      <Textarea
        value={value}
        className={name}
        onChange={onChange}
        onBlur={onBlur}
        disabled={isFormSubmitting}
      />
    )}
  />;