
export const createPlanFormDefenition = [
  {
    sectionTitle: 'Plan Details',
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
        label: 'Published',
        name: 'official',
        type: 'boolean',
        hidden: true,
      },
      {
        label: 'Deleted',
        name: 'deleted',
        type: 'boolean',
        hidden: true,
      },
    ]
  }
];
