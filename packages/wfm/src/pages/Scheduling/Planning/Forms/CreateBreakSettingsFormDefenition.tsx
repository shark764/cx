
export const createBreakSettingsFormDefenition = [
  {
    sectionTitle: '',
    collapsable: false,
    fields: [
      {
        label: 'From',
        name: 'shiftStartMin',
        type: 'textInput',
        hidden: false,
      },
      {
        label: 'To',
        name: 'shiftStartMax',
        type: 'textInput',
        hidden: false,
      },
      {
        label: 'Min shift length',
        name: 'shiftLengthMin',
        type: 'numberInput',
        hidden: false,
      },
      {
        label: 'Max shift length',
        name: 'shiftLengthMax',
        type: 'numberInput',
        hidden: false,
      },
      {
        label: 'Time between breaks',
        name: 'timeBetweenBreaksMin',
        type: 'numberInput',
        hidden: false,
      },
    ]
  },
  {
    sectionTitle: 'Breaks',
    collapsable: false,
    fields: [
      {
        label: '',
        name: 'breaks',
        type: 'breakSettings',
        hidden: false,
        fullWidth: true,
      },
    ]
  },
  {
    sectionTitle: 'Applicable Days',
    collapsable: false,
    fields: [
      {
        label: '',
        name: 'dayTypes',
        type: 'dayTypes',
        hidden: false,
        constraints: {
          dayTypes: {
            required: 'At least one day is required'
          },
        }
      },
    ]
  },
];
