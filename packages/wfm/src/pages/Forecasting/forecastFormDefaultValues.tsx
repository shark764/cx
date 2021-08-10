import { CreateUUID } from '@cx/utilities/uuid';
import { DateTime } from 'luxon';

export const defaultForecastFormValues = (memoScenariosOptions: any = []) => {

  const endDate = memoScenariosOptions?.[0]?.endDate;

  // Default foprecast range continues from last scenario
  const initStart = DateTime.fromISO(endDate).plus({days: 1}).startOf('day');
  const initEnd = initStart.plus({days: 6});

  const initIntradayStart = DateTime.now();
  const initIntradayEnd = initIntradayStart.minus({days: (7 * 12) - 1 });


  return ({
  name: CreateUUID(),
  description: '',
  forecastRange: [{
    startDate: initStart.isValid ? initStart : DateTime.now().startOf('week').startOf('day'),
    endDate: initEnd.isValid ? initEnd : DateTime.now().endOf('week').startOf('day'),
  }],
  dayCurveDateRanges: [{ startDate: initIntradayStart, endDate: initIntradayEnd }],
  algorithm: 'prophet',
  includeDayCurve: true,
  metrics: ['nco', 'tot', 'abandons'],
  'country_holidays': {label: 'United States', value: 'US'},
  algorithmOptions: [
    { option: 'include_history', value: false },
  ],
  scenarioType: 'temporary',
  // AlgorithmOptions fields
  // the above algorithm options are hidden the below correspond to form fields
  activate_filter: true,
  distribution_weight: 'exponential',
})};