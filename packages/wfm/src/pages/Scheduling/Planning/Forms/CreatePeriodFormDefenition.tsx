
export const createPeriodFormDefenition = [
  {
    sectionTitle: '',
    collapsable: false,
    fields: [
      {
        label: 'Name',
        name: 'name',
        type: 'textInput',
        hidden: false,
        constraints: {
          name: {
            required: 'Name is required.'
          },
        }
      },
      {
        label: 'Date Range',
        name: 'shedulePeriods',
        type: 'evenWeeks',
        multiValue: false,
        constraints: {
          shedulePeriods: {
            required: 'From Date is required.',
            isMonday: 'Start date should start on a monday.'
          },
        }
      }
    ],
  }
];
