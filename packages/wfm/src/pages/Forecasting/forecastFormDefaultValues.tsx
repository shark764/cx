import { CreateUUID } from '@cx/utilities/uuid';

export const defaultForecastFormValues = () => ({
  name: CreateUUID(),
  description: '',
  algorithm: 'prophet',
  includeDayCurve: true,
  metrics: ['nco', 'tot', 'abandons'],
  algorithmOptions: [
    { option: 'include_history', value: false },
    { option: 'country_holidays', value: 'US' },
  ],
  scenarioType: 'temporary',
  // AlgorithmOptions fields
  // the above algorithm options are hidden the below correspond to form fields
  activate_filter: false,
  distribution_weight: 'exponential',
});