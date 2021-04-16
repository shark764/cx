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
  none: EmptyComponent,
};
interface DynamicFormBuilder {
  sectionTitle: string;
  collapsable: boolean;
  collapsableDefaultOpen?: boolean;
  fields: {
    label: string;
    name: string;
    type: string;
    choices?: any;
    constraints: any;
  }[]
};

export const DynamicForm = ({ onSubmit, onCancel, isFormSubmitting, defaultValues, formDefenition}) => {
  const [ toggledFields, setToggledFields ] = useState({}); //TODO:  figure out toggled fields from the provided defaultValues? or have a nerw one called default fields
  const { handleSubmit, control,  register } = useForm({ defaultValues });

  const invalidSubmission = (data) => { console.log(data) };

  const getToggledField = (name: string, fields: any[]) => {

    console.log('um', name, fields, toggledFields)
    const possibleField = fields.find(f => f.label === name)?.type;
    return possibleField ? fieldComponents[possibleField] : () => <span />
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, invalidSubmission)}>
      <Wrapper>
        {formDefenition.map(({sectionTitle, collapsable, fields, collapsableDefaultOpen}) =>
        <DetailWrapper
          title={sectionTitle}
          collapsable={collapsable}
          key={sectionTitle}
          open={collapsableDefaultOpen}
        >

          {fields.map(({label, name, type, constraints, choices, hidden, multiValue, toggleable, toggles, toggleFields}) =>
          <FieldContainer label={label} key={label} hidden={hidden} >

            {toggleable ?
              // RadioToggle({control, isFormSubmitting, choices: toggles, name, defaultValue: toggles[0].value})
              <>
                <ContrtolledToggles choices={toggles} value={toggledFields[name]} onChange={({target: { value }}) => {
                  // console.log('hiya', value)  }
                  setToggledFields({...toggledFields, [name]: value})
                }} />
                { getToggledField(toggledFields[name], toggleFields)({control, register, isFormSubmitting, choices, name, defaultValue: defaultValues[name] || null, multiValue}) }
              </>
              :
              fieldComponents[type]({control, register, isFormSubmitting, choices, name, defaultValue: defaultValues[name] || null, multiValue})
            }

            {/* { fieldComponents[type]({control, register, isFormSubmitting, choices, name, defaultValue: defaultValues[name] || null, multiValue}) } */}
          </FieldContainer>)}

        </DetailWrapper>)}

      <FormActions>
        <Button
          style={{ color: '#4c4a4a' }}
          variant="outlined"
          onClick={onCancel}
          className="dynamicFormCancel"
        >
          Cancel
        </Button>
        <Button
          style={{ color: 'white', background: '#07487a' }}
          variant="contained"
          disableElevation
          color="primary"
          type="submit"
          className="dynamicFormSave"
        >
          Save
        </Button>
      </FormActions>

      </Wrapper>
    </form>
  );
}
