import { CreateUUID } from '@cx/utilities/uuid';
import { DateTime } from 'luxon';

export const defaultForecastFormValues = (memoScenariosOptions: any) => {

  const { endDate } = memoScenariosOptions[memoScenariosOptions.length - 1] || {};

  // Default foprecast range continues from last scenario
  const initStart = DateTime.fromISO(endDate).plus({days: 1}).startOf('day');
  const initEnd = initStart.plus({days: 6});

  const initIntradayStart = DateTime.now();
  const initIntradayEnd = initIntradayStart.minus({days: (7 * 12) - 1 });


  return ({
  name: CreateUUID(),
  description: '',
  forecastRange: [{ startDate: initStart, endDate: initEnd }],
  dayCurveDateRanges: [{ startDate: initIntradayStart, endDate: initIntradayEnd }],
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
})};