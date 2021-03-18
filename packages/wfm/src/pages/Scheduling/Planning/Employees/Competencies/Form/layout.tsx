import { FormField } from '@cx/components/Form/Fields/FormField';
import { HeaderGroup } from '@cx/components/Form/HeaderGroup';
import { Button } from '@cx/components/Inputs/Button';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { DatePicker } from '@cx/components/DateTime/DatePicker';
import { IForm, IOption } from '@cx/types/form';

const Wrap = styled.span`
  display: block;
`;
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
  competencies: IOption[];
  queues: IOption[];
}
export function FormLayout({
  onSubmit,
  defaultValues = {},
  competencies,
  queues,
  onCancel,
  isFormSubmitting = false,
}: IFormLayout) {
  const { handleSubmit, control, register } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderGroup title="Competencies">
        <FormField label="Valid From">
          <Controller
            control={control}
            name="validFrom"
            render={({ onChange, onBlur, value }) => (
              <DatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                isClearable
                calendarBtn
                disabled={isFormSubmitting}
              />
            )}
          />
        </FormField>

        <FormField label="Select Competence">
          <div>
            {competencies.map((competency: IOption) => (
              <Wrap key={competency.value}>
                <label key={competency.value}>
                  <input
                    type="checkbox"
                    value={competency.value}
                    name="competencies"
                    ref={register}
                    disabled={isFormSubmitting}
                  />
                  {competency.label}
                </label>
              </Wrap>
            ))}
          </div>
        </FormField>
      </HeaderGroup>

      <HeaderGroup title="Competencies Not Editable">
        <FormField label="Select Competence">
          <div>
            {queues.map((queue: IOption) => (
              <Wrap key={queue.value}>
                <label key={queue.value}>
                  <input type="checkbox" value={queue.value} name="queues" ref={register} disabled={isFormSubmitting} />
                  {queue.label}
                </label>
              </Wrap>
            ))}
          </div>
        </FormField>
      </HeaderGroup>

      <Actions>
        <AButton type="button" onClick={onCancel} label="Cancel" bgColor="white" />
        <AButton type="submit" label="Submit" disabled={isFormSubmitting} primary />
      </Actions>
    </form>
  );
}
