import { FormField } from '@cx/components/Form/Fields/FormField';
import { HeaderGroup } from '@cx/components/Form/HeaderGroup';
import { Button } from '@cx/components/Inputs/Button';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled, { useTheme } from 'styled-components';
import { DatePicker } from '@cx/components/DateTime/DatePicker';
import { IForm } from '@cx/types/form';
import { TextBox } from '@cx/components/Inputs/TextBox';
import { Info } from '@cx/components/Icons/Info';
import { Note } from '@cx/components/Note';

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

const Info2 = styled(Info)`
  display: inline-block;
  margin: 0 0.125em;
  padding: 0;
  vertical-align: sub;
`;

interface IFormLayout extends IForm {
  defaultRestriction?: any;
}
export function FormLayout({
  onSubmit,
  defaultValues = {},
  defaultRestriction = {},
  onCancel,
  isFormSubmitting = false,
}: IFormLayout) {
  const theme: any = useTheme();

  const {
    handleSubmit, control, register, watch, reset,
  } = useForm({
    defaultValues,
  });

  const defaultSetApplied = watch('defaultSet');

  React.useEffect(() => {
    if (defaultSetApplied) {
      console.log({ defaultSetApplied });
      reset({
        ...defaultValues,
        ...defaultRestriction,
        validFrom: defaultValues.validFrom || new Date(),
        defaultSet: true,
      });
    }
  }, [defaultRestriction, defaultSetApplied, defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Edit Valid From">
        <Controller
          control={control}
          name="validFrom"
          render={(props) => (
            <DatePicker
              onChange={props.onChange}
              onBlur={props.onBlur}
              selected={props.value}
              className="input"
              isClearable
              calendarBtn
              disabled={isFormSubmitting}
            />
          )}
        />
      </FormField>

      {defaultValues.isDefault ? (
        <Note>
          <Info2 fill={theme.colors['accent-1']} />
          {' '}
          Changes apply to all with Default Restriction Set
        </Note>
      ) : (
        <FormField label="">
          <label>
            <input type="checkbox" name="defaultSet" ref={register} disabled={isFormSubmitting} />
            Apply Default Restrictions
          </label>
        </FormField>
      )}

      {defaultSetApplied && !defaultValues.isDefault && (
        <Note>
          <Info2 fill={theme.colors['accent-1']} />
          {' '}
          Default Restriction Set applied, all fields are read only
        </Note>
      )}

      <HeaderGroup title="Hours Per Week">
        <FormField label="Agreed Hours">
          <TextBox
            type="number"
            name="agreedHours"
            ref={register({ min: 0 })}
            disabled={isFormSubmitting}
            readOnly={defaultSetApplied && !defaultValues.isDefault}
          />
        </FormField>
        <FormField label="Min Hours Per Week">
          <TextBox
            type="number"
            name="minHours"
            ref={register({ min: 0 })}
            disabled={isFormSubmitting}
            readOnly={defaultSetApplied && !defaultValues.isDefault}
          />
        </FormField>
        <FormField label="Max Hours Per Week">
          <TextBox
            type="number"
            name="maxHours"
            ref={register({ min: 0 })}
            disabled={isFormSubmitting}
            readOnly={defaultSetApplied && !defaultValues.isDefault}
          />
        </FormField>
      </HeaderGroup>

      <HeaderGroup title="Shifts">
        <FormField label="Min Shifts Per Week">
          <TextBox
            type="number"
            name="minShift"
            ref={register({ min: 0 })}
            disabled={isFormSubmitting}
            readOnly={defaultSetApplied && !defaultValues.isDefault}
          />
        </FormField>
        <FormField label="Max Shifts Per Week">
          <TextBox
            type="number"
            name="maxShift"
            ref={register({ min: 0 })}
            disabled={isFormSubmitting}
            readOnly={defaultSetApplied && !defaultValues.isDefault}
          />
        </FormField>
        <FormField label="Min Shift Lenght">
          <TextBox
            type="number"
            name="minShiftLength"
            ref={register({ min: 0 })}
            disabled={isFormSubmitting}
            readOnly={defaultSetApplied && !defaultValues.isDefault}
          />
        </FormField>
        <FormField label="Max Shift Lenght">
          <TextBox
            type="number"
            name="maxShiftLength"
            ref={register({ min: 0 })}
            disabled={isFormSubmitting}
            readOnly={defaultSetApplied && !defaultValues.isDefault}
          />
        </FormField>
      </HeaderGroup>

      <HeaderGroup title="Max Consecutive Work Days">
        <FormField label="Max Work Days">
          <TextBox
            type="number"
            name="maxWorkDays"
            ref={register({ min: 0 })}
            disabled={isFormSubmitting}
            readOnly={defaultSetApplied && !defaultValues.isDefault}
          />
        </FormField>
      </HeaderGroup>

      <HeaderGroup title="Max Consecutive Weekends">
        <FormField label="Max Weekends">
          <TextBox
            type="number"
            name="maxWeekends"
            ref={register({ min: 0 })}
            disabled={isFormSubmitting}
            readOnly={defaultSetApplied && !defaultValues.isDefault}
          />
        </FormField>
      </HeaderGroup>

      <HeaderGroup title="Rest">
        <FormField label="Min Hours Week Rest">
          <TextBox
            type="number"
            name="minWeekRest"
            ref={register({ min: 0 })}
            disabled={isFormSubmitting}
            readOnly={defaultSetApplied && !defaultValues.isDefault}
          />
        </FormField>
        <FormField label="Min Hours Night Rest">
          <TextBox
            type="number"
            name="minNightRest"
            ref={register({ min: 0 })}
            disabled={isFormSubmitting}
            readOnly={defaultSetApplied && !defaultValues.isDefault}
          />
        </FormField>
      </HeaderGroup>

      <Actions>
        <AButton type="button" onClick={onCancel} label="Cancel" bgColor="white" />
        <AButton type="submit" label="Submit" disabled={isFormSubmitting} primary />
      </Actions>
    </form>
  );
}
