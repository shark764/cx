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
      },
      {
        label: 'Scenario Type',
        name: 'scenarioType',
        type: 'textInput',
        hidden: true,
      },
      {
        label: 'Description',
        name: 'description',
        type: 'textboxInput',
        hidden: true,
      },
      {
        label: '',
        name: 'forecastRange',
        type: 'evenWeeks',
        multiValue: false,
        constraints: {
          forecastRange: {
            startDate: {
              required: 'From Date is required.',
              isMonday: 'Start date should start on a monday.'
            },
            weeks: { required: 'No.of weeks is required.' },
            endDate: { required: 'To Date is required.' }
          },
        }
      }
    ],
  },
  {
    sectionTitle: 'Historical Date Ranges',
    collapsable: false,
    fields: [
      {
        label: 'Day',
        name: 'dayValueDateRanges',
        toggles: [{ label: 'All Historical', value: 'historical' }, { label: 'Set Range', value: 'range' }],
        defaultToggled: 'historical',
        toggleFields: [
          {
            label: 'historical',
            name: 'dayValueDateRanges',
            type: 'none',
          },
          {
            label: 'range',
            name: 'dayValueDateRanges',
            type: 'evenWeeks',
            constraints: {
              dayValueDateRanges: {
                startDate: { required: 'From Date is required.'},
                weeks: { required: 'No.of weeks is required.' },
                endDate: { required: 'To Date is required.' }
              },
            }
          },
        ],
        multiValue: true,
        toggleable: true,
      },
      {
        label: 'Intraday',
        name: 'dayCurveDateRanges',
        type: 'evenWeeks',
        constraints: {
          dayCurveDateRanges: {
            startDate: { required: 'From Date is required.' },
            weeks: { required: 'No.of weeks is required.' },
            endDate: { required: 'To Date is required.' }
          },
        }
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
      },
      // { // This is getting set from existing competencies right now
      // but in the future may come from from user selection
      // label: 'Series',
      // name: 'series',
      // type: 'series',
      // },
      {
        label: 'Algorithm',
        name: 'algorithm',
        type: 'textInput',
        hidden: true,
      },
      {
        label: 'Metrics',
        name: 'metrics',
        type: 'multiselect',
        hidden: true,
        choices: [{ label: 'NCO', value: 'nco' }, { label: 'TOT', value: 'tot' }, { label: 'Abandons', value: 'abandons' }],
      },
      {
        label: 'Algorithm Options',
        name: 'algorithmOptions',
        type: 'textInput',
        hidden: true,
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
            constraints: {}
          },
          {
            label: 'logistical',
            name: 'growth',
            type: 'floorAndCap',
            constraints: {
              growth: {
                cap: {
                  required: 'Cap is required',
                  min: 'Cap must be higher than zero',
                  lowerThanFloor: 'Cap must be greater than floor',
                },
                floor: {
                  required: 'Floor is required',
                  min: 'Floor must be higher than zero',
                  higherThanCap: 'Floor must be lower than cap',
                },
              },
            }
          },
        ],
        toggleable: true,
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
        choices: [{ label: 'Even', value: 'even' }, { label: 'Exponential', value: 'exponential' }],
      },
      {
        label: 'Smoothing',
        name: 'activate_filter',
        type: 'boolean',
      },
    ]
  },
];
