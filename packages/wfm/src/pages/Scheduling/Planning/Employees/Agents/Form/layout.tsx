import { FormField } from '@cx/components/Form/Fields/FormField';
import { HeaderGroup } from '@cx/components/Form/HeaderGroup';
import { Button } from '@cx/components/Inputs/Button';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { DatePicker } from '@cx/components/DateTime/DatePicker';
import { IForm, IOption } from '@cx/components/Form/types';
import Select from 'react-select';

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 50px 0;
  padding: 25px;
  border-top: solid 1px rgba(128, 128, 128, 0.59);
`;
const AButton = styled(Button)`
  padding: 10px 25px;
  border-radius: 8px;
`;

interface IFormLayout extends IForm {
  timezones: IOption[];
  timezonesLoading: boolean;
  teams: IOption[];
  teamsLoading: boolean;
}
export function FormLayout({
  onSubmit,
  defaultValues = {},
  timezones,
  timezonesLoading,
  teams,
  teamsLoading,
  onCancel,
}: IFormLayout) {
  const {
    register, handleSubmit, errors, control,
  } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderGroup title="Organization">
        <FormField label="Valid From">
          <Controller
            control={control}
            name="validFrom"
            render={(props) => (
              <DatePicker
                onChange={props.onChange}
                onBlur={props.onBlur}
                selected={props.value}
                className="input"
                calendarBtn
              />
            )}
          />
        </FormField>
        <FormField label="Valid To">
          <Controller
            control={control}
            name="validTo"
            render={(props) => (
              <DatePicker
                onChange={props.onChange}
                onBlur={props.onBlur}
                selected={props.value}
                className="input"
                calendarBtn
              />
            )}
          />
        </FormField>
        <FormField label="Team">
          <Controller
            name="team"
            type="select"
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Select onChange={onChange} onBlur={onBlur} value={value} options={teams} />
            )}
          />
        </FormField>
      </HeaderGroup>

      <HeaderGroup title="Employment Dates">
        <FormField label="Date of Employment">
          <Controller
            control={control}
            name="employmentDate"
            render={(props) => (
              <DatePicker
                onChange={props.onChange}
                onBlur={props.onBlur}
                selected={props.value}
                className="input"
                calendarBtn
              />
            )}
          />
        </FormField>
        <FormField label="End of Employment">
          <Controller
            control={control}
            name="employmentEndDate"
            render={({ onChange, onBlur, value }) => (
              <DatePicker onChange={onChange} onBlur={onBlur} selected={value} className="input" calendarBtn />
            )}
          />
        </FormField>
      </HeaderGroup>

      <HeaderGroup title="Timezone">
        <FormField label="Timezone">
          <Controller
            name="timezone"
            type="select"
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Select onChange={onChange} onBlur={onBlur} value={value} options={timezones} />
            )}
          />
        </FormField>
      </HeaderGroup>

      <Actions>
        {/* @ts-ignore */}
        <AButton type="button" onClick={onCancel} label="Cancel" bgColor="white" />
        {/* @ts-ignore */}
        <AButton type="submit" label="Submit" primary />
      </Actions>
    </form>
  );
}
