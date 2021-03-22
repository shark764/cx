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