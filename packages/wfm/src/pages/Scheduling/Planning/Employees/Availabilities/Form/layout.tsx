import { FormField } from '@cx/components/Form/Fields/FormField';
import { HeaderGroup } from '@cx/components/Form/HeaderGroup';
import { Button } from '@cx/components/Inputs/Button';
import * as React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { DatePicker } from '@cx/components/DateTime/DatePicker';
import { IForm, IOption } from '@cx/types/form';
import { Select } from '@cx/components/Inputs/Select';
import { TextBox } from '@cx/components/Inputs/TextBox';
import RSelect from 'react-select';
import { Message } from '@cx/components/Message';
import { Dash, SimpleTable } from '@cx/components/Styled';
import { capitalize } from '@cx/utilities/string';

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
const AddButton = styled(Button)`
  padding: 6px 18px;
  border-radius: 4px;
`;

const WeekTitle = styled.h4`
  margin-bottom: 0;
`;
const TTName = styled.p`
  font-size: 18px;
  margin-left: 0.5rem;
`;

function Week({
  item,
  disabled = false,
  register,
  index,
}: {
  item: any;
  disabled: boolean;
  register: any;
  index: number;
}) {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return (
    <>
      <WeekTitle>{`Week: ${item.week}`}</WeekTitle>
      <SimpleTable numCol={8}>
        <span className="st-cell st-header" />
        {days.map((day: string) => (
          <span className="st-cell st-header" key={day}>
            {capitalize(day)}
          </span>
        ))}
        <div className="st-row">
          <span className="st-cell" />
          {days.map((day: string) => (
            <span className="st-cell" key={day}>
              <Select
                name={`weeks[${index}].${day}Available`}
                defaultValue={`${item[`${day}Available`]}`}
                ref={register()}
                disabled={disabled}
              >
                <option value="" />
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </Select>
            </span>
          ))}
        </div>
        <div className="st-row">
          <span className="st-cell">From</span>
          {days.map((day: string) => (
            <span className="st-cell" key={day}>
              <TextBox
                type="text"
                name={`weeks[${index}].${day}Start`}
                defaultValue={`${item[`${day}Start`]}`}
                ref={register()}
                disabled={disabled}
              />
            </span>
          ))}
        </div>
        <div className="st-row">
          <span className="st-cell">To</span>
          {days.map((day: string) => (
            <span className="st-cell" key={day}>
              <TextBox
                type="text"
                name={`weeks[${index}].${day}End`}
                defaultValue={`${item[`${day}End`]}`}
                ref={register()}
                disabled={disabled}
              />
            </span>
          ))}
        </div>
      </SimpleTable>
    </>
  );
}

interface IFormLayout extends IForm {
  agents: IOption[];
}
export function FormLayout({
  onSubmit,
  defaultValues = {},
  onCancel,
  isAddMode = false,
  isFormSubmitting = false,
  agents,
}: IFormLayout) {
  const {
    handleSubmit, control, register, reset, watch,
  } = useForm({
    defaultValues,
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'weeks',
  });

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const saveAsTimetable = watch('saveAsTimetable');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderGroup title="Edit">
        {isAddMode ? (
          <FormField label="Timetable Name">
            <TextBox
              type="text"
              name="name"
              ref={register}
              disabled={isFormSubmitting}
              placeholder="timetable name..."
            />
          </FormField>
        ) : (
          <TTName>
            Timetable:
            {' '}
            <strong>{defaultValues.name}</strong>
          </TTName>
        )}

        <FormField label="Start Date">
          <Controller
            control={control}
            name="startDate"
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
        <FormField label="End Date">
          <Controller
            control={control}
            name="endDate"
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

        {fields.map((item: any, index: number) => (
          <Week item={item} register={register} disabled={isFormSubmitting} index={index} key={item.id} />
        ))}
        <AddButton
          type="button"
          onClick={() => {
            append({
              week: fields.length + 1,
              sundayAvailable: '',
              sundayStart: '',
              sundayEnd: '',
              mondayAvailable: '',
              mondayStart: '',
              mondayEnd: '',
              tuesdayAvailable: '',
              tuesdayStart: '',
              tuesdayEnd: '',
              wednesdayAvailable: '',
              wednesdayStart: '',
              wednesdayEnd: '',
              thursdayAvailable: '',
              thursdayStart: '',
              thursdayEnd: '',
              fridayAvailable: '',
              fridayStart: '',
              fridayEnd: '',
              saturdayAvailable: '',
              saturdayStart: '',
              saturdayEnd: '',
            });
          }}
          label="Add Week"
          primary
        />
      </HeaderGroup>

      <HeaderGroup title="Save as new Timetable">
        <FormField>
          <label>
            <input type="checkbox" name="submitChangesTimeTable" ref={register} disabled={isFormSubmitting} />
            Submit changes to Timetable
            <Dash />
            <Message messageType="warning" text="Will be applied for all employees connected" />
          </label>
        </FormField>

        <FormField>
          <label>
            <input type="checkbox" name="saveAsTimetable" ref={register} disabled={isFormSubmitting} />
            Save as new Timetable
          </label>
        </FormField>
        {saveAsTimetable && (
          <>
            <FormField label="Name">
              <TextBox type="text" name="newName" ref={register} disabled={isFormSubmitting} />
            </FormField>

            <FormField label="Start Date">
              <Controller
                control={control}
                name="newStartDate"
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
            <FormField label="End Date">
              <Controller
                control={control}
                name="newEndDate"
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
            <FormField label="Also connect to Employee">
              <Controller
                name="connectTo"
                type="select"
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <RSelect
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    options={agents}
                    isClearable
                    isDisabled={isFormSubmitting}
                  />
                )}
              />
            </FormField>
          </>
        )}
      </HeaderGroup>

      <Actions>
        <AButton type="button" onClick={onCancel} label="Cancel" bgColor="white" />
        <AButton type="submit" label="Submit" primary />
      </Actions>
    </form>
  );
}
