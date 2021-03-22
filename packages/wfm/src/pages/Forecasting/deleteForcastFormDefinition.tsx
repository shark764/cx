export const deleteForcastFormDefinition = [
  {
    sectionTitle: 'Deletion Date Range',
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
    ]
  }
];