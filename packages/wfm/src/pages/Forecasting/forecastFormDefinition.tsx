export const createForecastFormDefenition = [
  {
    sectionTitle: 'Details',
    collapsable: false,
    fields: [
      {
        label: 'Name',
        name: 'name',
        type: 'textInput',
        constraints: [{required: true}],
      },
      {
        label: 'Scenario Type',
        name: 'scenarioType',
        type: 'textInput',
        hidden: true,
        constraints: [{required: true}],
      },
      {
        label: 'Description',
        name: 'description',
        type: 'textboxInput',
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
    sectionTitle: 'Historical Date Ranges',
    collapsable: false,
    fields: [
      {
        label: 'Day value ranges',
        name: 'dayValueDateRanges',
        type: 'dateRanges',
        constraints: [{required: true}],
      },
      {
        label: 'Day curve range',
        name: 'dayCurveDateRange',
        type: 'dateRange',
        constraints: [{required: true}],
      },
    ],
  },
  {
    sectionTitle: 'Options',
    collapsable: false,
    fields: [
      {
        label: 'Day curve',
        name: 'includeDayCurve',
        type: 'boolean',
        constraints: [{required: true}],
      },
      {
        label: 'Series',
        name: 'series',
        type: 'series',
        constraints: [{required: true}],
      },
      {
        label: 'Algorithm',
        name: 'algorithm',
        type: 'textInput',
        hidden: true,
        constraints: [{required: true}],
      },
      {
        label: 'Metrics',
        name: 'metrics',
        type: 'multiselect',
        choices: [{label: 'NCO', value: 'nco'}, {label: 'AHT', value: 'aht'}, {label: 'Abandons', value: 'abandons'}],
        constraints: [{required: true}],
      },
      {
        label: 'Algorithm Options',
        name: 'algorithmOptions',
        type: 'textInput',
        hidden: true,
        constraints: [{required: true}],
      },
    ],
  },
];