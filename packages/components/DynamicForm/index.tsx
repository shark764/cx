import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import {DetailWrapper} from './DetailWrapper';
import { DateInput } from './DateInput';
import { FieldContainer } from './FieldContainer';
import { RadioToggle, RadioButton, ContrtolledToggles } from './RadioField';
import { TextInput } from './TextInput';
import { TextboxInput } from './TextboxInput';
import { DateRanges } from './DateRanges';
import { SeriesInput } from './SeriesInput';
import { DateRange } from './DateRange';
import { BooleanInput } from './BooleanInput';
import { MultiSelectInput } from './MultiSelect';
import { MultiSelectObjectInput } from './MultiSelectObjects';
import { WeekMultiplier } from './WeekMultiplier';
import { EvenWeeks } from './EvenWeeks';
import { TypeaheadInput } from './Typeahead';
import { FloorAndCap } from './FloorAndCap';
import Button from '@material-ui/core/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const FormActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 10px;
  grid-gap: 30px;
  padding: 10px;
`;
const EmptyComponent = () => <span/>;
const fieldComponents = {
  date: DateInput,
  radio: RadioButton,
  radioToggle: RadioToggle,
  textInput: TextInput,
  textboxInput: TextboxInput,
  dateRanges: DateRanges,
  series: SeriesInput,
  dateRange: DateRange,
  boolean: BooleanInput,
  multiselect: MultiSelectInput,
  multiselectObject: MultiSelectObjectInput,
  weekMultiplier: WeekMultiplier,
  evenWeeks: EvenWeeks,
  typeahead: TypeaheadInput,
  floorAndCap: FloorAndCap,
  none: EmptyComponent,
};
interface DynamicFormBuilder {
  sectionTitle: string;
  hidden?: boolean;
  collapsable: boolean;
  collapsableDefaultOpen?: boolean;
  fields: {
    label: string;
    name: string;
    type: string;
    choices?: any;
    constraints: any;
    defaultToggled?: string;
    hiddenToggleField? : string;
  }[]
};

export const DynamicForm = ({ onSubmit, onCancel, isFormSubmitting, defaultValues, formDefenition}) => {

  const findDefaultedToggles = (toggleFields: any, defaultToggled: any) => {
    if (!toggleFields || !defaultToggled) { return {}; }
    const {name, label} = toggleFields.find(({label}: any) => label === defaultToggled);
    return { [name]: label };
  };

  const defaultToggledFields = formDefenition.reduce((acc: any, {fields}: any) =>
    ({ ...acc, ...fields.reduce((acc2:any, {toggleFields, defaultToggled}: any) => ({...acc2, ...findDefaultedToggles(toggleFields, defaultToggled) }), {})})
  , {});

  const [ toggledFields, setToggledFields ] = useState(defaultToggledFields);

  const { handleSubmit, control,  register } = useForm({ defaultValues });

  const invalidSubmission = (data) => { console.log(data) };

  const getToggledField = (name: string, fields: any[]) => {
    const possibleField = fields.find(f => f.label === name)?.type;
    return possibleField ? fieldComponents[possibleField] : () => <span />
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, invalidSubmission)}>
      <Wrapper>
        {formDefenition.map(({sectionTitle, collapsable, fields, collapsableDefaultOpen, hidden}) =>
        <DetailWrapper
          title={sectionTitle}
          collapsable={collapsable}
          key={sectionTitle}
          open={collapsableDefaultOpen}
          hidden={hidden}
        >

          {fields.map(({label, name, type, constraints, choices, hidden, multiValue, toggleable, toggles, toggleFields, defaultToggled, hiddenToggleField}) =>
          <FieldContainer label={label} key={label} hidden={hidden} >
            {toggleable ?
              <>
                <ContrtolledToggles
                  choices={toggles}
                  defaultValue={defaultToggled}
                  onChange={({target: { value }}) => {
                    setToggledFields({...toggledFields, [name]: value})
                  }}
                />
                { getToggledField(toggledFields[name] || defaultToggled , toggleFields)({
                    control,
                    register,
                    isFormSubmitting,
                    choices,
                    name,
                    multiValue,
                    defaultValue: defaultValues[name] || null,
                    optionName: toggledFields[name],
                    hidden: !!toggles.find(({value, hidden}) => value === toggledFields[name] && hidden)
                  })
                }
              </>
              :
              fieldComponents[type]({control, register, isFormSubmitting, choices, name, multiValue, defaultValue: defaultValues[name] || null})
            }
          </FieldContainer>)}

        </DetailWrapper>)}

      <FormActions>
        <Button
          color="default"
          variant="outlined"
          onClick={onCancel}
          className="dynamicFormCancel"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          color="primary"
          type="submit"
          className="dynamicFormSave"
        >
          Submit
        </Button>
      </FormActions>

      </Wrapper>
    </form>
  );
}
