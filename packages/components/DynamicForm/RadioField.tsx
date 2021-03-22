import * as React from 'react';
import styled from 'styled-components';
import { Controller, Control } from 'react-hook-form';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;
const RadioToggles = styled(RadioGroup)`
  justify-content: space-between;
`;

interface Props {
  value?: string;
  label: string;
  control?: Control;
  onChange?: () => void;
  checked?: boolean;
  name?: string;
  defaultValue?: string;
  choices?: {value: string, label: string}[]
};

export const RadioButton: React.VFC<Props> = ({value, label, onChange, name }) =>
    <Wrapper>
      <Radio
        value={value}
        color="default"
        size="small"
        onChange={onChange}
        name={name}
      />
      {label && <label>{label}</label>}
    </Wrapper>;

export const RadioToggle: React.VFC<Props> = ({control, choices = [], name, defaultValue}) =>
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ onChange, value }) => (
      <RadioToggles name={name} value={value} onChange={onChange} row >
        {choices.map((choice) =>
          <FormControlLabel
            value={choice.value}
            control={<Radio />}
            label={choice.label}
            key={choice.value}
            labelPlacement="start"
          />
          )}
        </RadioToggles>
    )}
  />;
