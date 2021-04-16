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
        toggleFields: [
          {
            label: 'historical',
            name: 'dayCurveDateRange',
            type: 'none',
            constraints: [{required: true}],
          },
          {
            label: 'range',
            name: 'dayCurveDateRange',
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
    sectionTitle: 'Options',
    collapsable: false,
    fields: [
      {
        label: 'Day curve',
        name: 'includeDayCurve',
        type: 'boolean',
        hidden: true,
        constraints: [{required: true}],
      },
      {
        label: 'Series (Pull from competencies when available)',
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
      // {
      //   label: 'Smoothing',
      //   name: 'active_filter',
      //   type: 'boolean',
      //   constraints: [{required: true}],
      // },
    ]
  },
  {
    sectionTitle: 'Intraday Settings',
    collapsable: false,
    fields: [

    ]
  },
];

// //     "algorithmOptions": [
//   {
//     "option": "activate_filter",  smoothing
//     "value": true
// },
// {
//     "option": "distribution_weight",
//     "value": "exponential"
// },
// {
//     "option": "country_holidays",  https://github.com/dr-prodigy/python-holidays
//     "value": "US"
// },
// {
//     "option": "span",
//     "value": 8
// },
// {
//     "option": "growth",
//     "value": "{\"method\":\"linear\",\"floor\":20,\"cap\":\"40\"}"
// }
// ]