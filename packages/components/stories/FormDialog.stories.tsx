import * as React from 'react';
import { useState } from 'react';
import { Story } from '@storybook/react';
import { FormDialog } from '../FormDialog';
import { DynamicForm } from '../DynamicForm';
import { createForecastFormDefenition, forecastFormDefaultValues  } from './DynamicForm.stories';

export default {
  title: 'Example/Form Dialog',
};

export const SimpleFormDialog: Story<any> = (args) => {

  const [ open, setOpen ] = useState(false);

  return (<>
  <button onClick={() => setOpen(!open)} > Toggle Dialog </button>
  <FormDialog open={open} title='Create forecast' close={ () => setOpen(false)  } >
    <DynamicForm
      defaultValues={forecastFormDefaultValues}
      formDefenition={createForecastFormDefenition}
      onCancel={ () => setOpen(false) }
      onSubmit={ (data) => { setOpen(false); console.log('submission: ', data); } }
      isFormSubmitting={false}
    ></DynamicForm>
  </FormDialog></>)
};
