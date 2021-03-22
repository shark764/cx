import * as React from 'react';
import { useState } from 'react';
import { Story } from '@storybook/react';
import { FormDialog } from '../FormDialog';
import { DynamicForm } from '../DynamicForm';

const exampleContainer = {
  border: '1px solid lightgrey',
  borderRadius: '5px',
  margin: '50px',
  display: 'inline-block',
  padding: '50px',
  width: '500px',
};

const createForecastFormDefenition = [
  {
    sectionTitle: 'Date Range',
    collapsable: false,
    fields: [
      {
        label: 'Start Date',
        name: 'startDate',
        type: 'date',
        constraints: [{required: true}],
      },
      {
        label: 'End Date',
        name: 'endDate',
        type: 'date',
        constraints: [{required: true}],
      },
    ],
  },
  {
    sectionTitle: 'Historical Date Range',
    collapsable: false,
    fields: [
      {
        label: 'Day',
        name: 'day',
        type: 'radioToggle',
        choices: [{label: 'All Historical', value: 'historical'}, {label: 'Set Range', value: 'range'}],
        constraints: [{required: true}],
      },
      {
        label: 'Intraday',
        name: 'intraday',
        type: 'radioToggle',
        choices: [{label: 'All Historical', value: 'historical'}, {label: 'Set Range', value: 'range'}],
        constraints: [{required: true}],
      },
      {
        label: 'Start Date',
        name: 'startDate',
        type: 'date',
        constraints: [{required: true}],
      },
      {
        label: 'End Date',
        name: 'endDate',
        type: 'date',
        constraints: [{required: true}],
      },
    ],
  },
  {
    sectionTitle: 'Day Settings',
    collapsable: false,
    fields: [
      {
        label: 'Trend',
        name: 'trend',
        type: 'radioToggle',
        choices: [{label: 'Linear', value: 'linear'}, {label: 'Logistical', value: 'logistical'}],
        constraints: [{required: true}],
      },
    ],
  },
  {
    sectionTitle: 'Intraday Settings',
    collapsable: false,
    fields: [
      {
        label: 'Historical Weight',
        name: 'historicalWeight',
        type: 'radioToggle',
        choices: [{label: 'Even', value: 'even'}, {label: 'Exponential', value: 'exponential'}],
        constraints: [{required: true}],
      },
      {
        label: 'Smoothing',
        name: 'smoothing',
        type: 'radioToggle',
        choices: [{label: 'Off', value: 'smoothingOff'}, {label: 'On', value: 'smoothingOn'}],
        constraints: [{required: true}],
      },
    ],
  }
];

export default {
  title: 'Example/Form Dialog',
};

export const SimpleFormDialog: Story<any> = (args) => {

  const [ open, setOpen ] = useState(false);

  return (<>
  <button onClick={() => setOpen(!open)} > Toggle Dialog </button>
  <FormDialog open={open} title='Create forecast' close={ () => setOpen(false)  } >
    <DynamicForm
      defaultValues={{}}
      formDefenition={createForecastFormDefenition}
      onCancel={ () => setOpen(false) }
      onSubmit={ (data) => { setOpen(false); console.log('submission: ', data); } }
      isFormSubmitting={false}
    ></DynamicForm>
  </FormDialog></>)
};
