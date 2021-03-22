import * as React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import {DetailWrapper} from './DetailWrapper';
import { DateInput } from './DateInput';
import { FieldContainer } from './FieldContainer';
import { RadioToggle, RadioButton } from './RadioField';
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
`;

const fieldComponents = {
  date: DateInput,
  radio: RadioButton,
  radioToggle: RadioToggle,
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

  const { handleSubmit, control,  register } = useForm({ defaultValues });

  const invalidSubmission = (data) => { console.log(data) };

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

          {fields.map(({label, name, type, constraints, choices}) =>
          <FieldContainer label={label} key={label} >
            { fieldComponents[type]({control, register, isFormSubmitting, choices, name, defaultValue: defaultValues[name] || ''}) }
          </FieldContainer>)}

        </DetailWrapper>)}

      <FormActions>
        <Button
          style={{ color: '#4c4a4a' }}
          variant="outlined"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          style={{ color: 'white', background: '#07487a' }}
          variant="contained"
          disableElevation
          color="primary"
          type="submit"
        >
          Save
        </Button>
      </FormActions>

      </Wrapper>
    </form>
  );
}
