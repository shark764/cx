export const activityCategories = [
  { label: 'Work', value: 'work' },
  { label: 'Operator Work', value: 'operator_work' },
  { label: 'Break', value: 'break' },
  { label: 'Absence', value: 'absence' },
  { label: 'Vacation', value: 'vacation' },
];

export const createActivityFormDefenition = [
  {
    sectionTitle: '',
    collapsable: false,
    fields: [
      {
        label: 'Name',
        name: 'name',
        type: 'textInput',
        hidden: false,
      },
      {
        label: 'Category',
        name: 'category',
        type: 'autocomplete',
        hidden: false,
        choices: activityCategories,
      },
      {
        label: 'Paid',
        name: 'paid',
        type: 'boolean',
        hidden: false,
      },
    ]
  },
];
