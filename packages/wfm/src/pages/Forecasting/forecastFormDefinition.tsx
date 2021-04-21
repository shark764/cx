export const createForecastFormDefenition = [
  {
    sectionTitle: 'Forecast Range',
    collapsable: false,
    fields: [
      {
        label: 'Name',
        name: 'name',
        type: 'textInput',
        hidden: true,
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
        hidden: true,
        constraints: [{required: true}],
      },
      {
        label: '',
        name: 'forecastRange',
        type: 'evenWeeks',
        multiValue: false,
        constraints: [{required: true}],
      },
    ],
  },
  {
    sectionTitle: 'Historical Date Ranges',
    collapsable: false,
    fields: [
      {
        label: 'Day',
        name: 'dayValueDateRanges',
        toggles: [{label: 'All Historical', value: 'historical'}, {label: 'Set Range', value: 'range'}],
        defaultToggled: 'historical',
        toggleFields: [
          {
            label: 'historical',
            name: 'dayValueDateRanges',
            type: 'none',
            constraints: [{required: true}],
          },
          {
            label: 'range',
            name: 'dayValueDateRanges',
            type: 'evenWeeks',
            constraints: [{required: true}],
          },
        ],
        multiValue: true,
        toggleable: true,
        constraints: [{required: true}],
      },
      {
        label: 'Intraday',
        name: 'dayCurveDateRange',
        type: 'evenWeeks',
        constraints: [{required: true}],
      },
    ],
  },
  {
    sectionTitle: 'Algorithm Options',
    collapsable: false,
    hidden: true,
    fields: [
      {
        label: 'Day curve',
        name: 'includeDayCurve',
        type: 'boolean',
        hidden: true,
        constraints: [{required: true}],
      },
      // {  // This is getting set from existing competencies right now
      // but in the future may come from from user selection
      //   label: 'Series',
      //   name: 'series',
      //   type: 'series',
      //   constraints: [{required: true}],
      // },
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
        hidden: true,
        choices: [{label: 'NCO', value: 'nco'}, {label: 'TOT', value: 'tot'}, {label: 'Abandons', value: 'abandons'}],
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
  {
    sectionTitle: 'Day Settings',
    collapsable: false,
    fields: [
      {
        label: 'Trend',
        name: 'growth',
        toggles: [
          {
            label: 'Linear',
            value: 'linear',
            hidden: true,
          },
          {
            label: 'Logistical',
            value: 'logistical'
          }
        ],
        defaultToggled: 'linear',
        hiddenToggleField: 'linear',
        toggleFields: [
          {
            label: 'linear',
            name: 'growth',
            type: 'floorAndCap',
            constraints: [{required: true}],
          },
          {
            label: 'logistical',
            name: 'growth',
            type: 'floorAndCap',
            constraints: [{required: true}],
          },
        ],
        toggleable: true,
        constraints: [{required: true}],
      },
    ]
  },
  {
    sectionTitle: 'Intraday Settings',
    collapsable: false,
    fields: [
      {
        label: 'Historical Weight',
        name: 'distribution_weight',
        type: 'radioToggle',
        choices: [{label: 'Even', value: 'even'}, {label: 'Exponential', value: 'exponential'}],
        constraints: [{required: true}],
      },
      {
        label: 'Smoothing',
        name: 'activate_filter',
        type: 'boolean',
        constraints: [{required: true}],
      },
    ]
  },
];
