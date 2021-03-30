export const createTimelineFormDefenition = [
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
        label: 'Description',
        name: 'description',
        type: 'textboxInput',
        constraints: [{required: true}],
      },
    ],
  },
];