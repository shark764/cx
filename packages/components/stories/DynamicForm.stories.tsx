import * as React from 'react';
import { Story } from '@storybook/react';
import { DynamicForm } from '../DynamicForm';

export default {
  title: 'Example/Dynamic Form',
};

const exampleContainer = {
  border: '1px solid lightgrey',
  borderRadius: '5px',
  margin: '50px',
  display: 'inline-block',
  padding: '50px',
  width: '500px',
};

export const createForecastFormDefenition = [
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
export const forecastFormDefaultValues = {
  smoothing: 'smoothingOff',
  startDate: Date.now(),
};

export const DynamicForms: Story<any> = (args) => <span style={exampleContainer}><DynamicForm {...args} /></span>;
DynamicForms.bind({});
DynamicForms.args = {
  defaultValues: forecastFormDefaultValues,
  formDefenition: createForecastFormDefenition,
  onCancel: () => { console.log('canceled') },
  onSubmit: (data) => { console.log('submission: ', data) },
};
