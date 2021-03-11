import * as faker from 'faker';
import { DateTime } from 'luxon';
import { randomUniform } from 'd3';

export const calcScheduledActivities = (startTime: number): any[] => [
  // Basic 8 hour shift example (and 1 hour for lunch)  , 7 activites, 2 15 min breaks
  {
    startTime: startTime + 0,
    endTime: startTime + 6750,
    title: 'Agent Online 1', // title|name and color not included will need to be mapped in later
    color: 'rgb(20, 119, 141)',
  },
  {
    startTime: startTime + 6750,
    endTime: startTime + 6750 + 900,
    title: 'Break 1',
    color: 'lightgrey',
  },
  {
    startTime: startTime + 6750 + 900,
    endTime: startTime + 6750 + 900 + 6750,
    title: 'Agent Online 2',
    color: 'rgb(20, 119, 141)',
  },
  {
    startTime: startTime + 6750 + 900 + 6750,
    endTime: startTime + 6750 + 900 + 6750 + 3600,
    title: 'Lunch',
    color: 'lightgrey',
  },
  {
    startTime: startTime + 6750 + 900 + 6750 + 3600,
    endTime: startTime + 6750 + 900 + 6750 + 3600 + 6750,
    title: 'Agent Online 3',
    color: 'rgb(20, 119, 141)',
  },
  {
    startTime: startTime + 6750 + 900 + 6750 + 3600 + 6750,
    endTime: startTime + 6750 + 900 + 6750 + 3600 + 6750 + 900,
    title: 'Break 2',
    color: 'lightgrey',
  },
  {
    startTime: startTime + 6750 + 900 + 6750 + 3600 + 6750 + 900,
    endTime: startTime + 6750 + 900 + 6750 + 3600 + 6750 + 900 + 6750,
    title: 'Agent Online 4',
    color: 'rgb(20, 119, 141)',
  },
];

const randomizer = () => Math.trunc(randomUniform(0, 15)());
// TODO: when analizing an activity segment we need to check if it falls outside the domain <--> and trim off that bit so it fits in the UI

// @ts-ignore   first shift starts at 7 am and each subsequent shift is ahead 1 hour
export const starter = () => (DateTime.now().startOf('day').plus((3600 * randomizer()) * 1000 ) ) / 1000;
// @ts-ignore
const temp = DateTime.now().startOf('day') / 1000;

export const scheduledActivities = calcScheduledActivities(starter());
// TODO: fix this
export const scheduledActivitiesPlus = (start) => calcScheduledActivities(start)
  .concat(calcScheduledActivities(start + (86400 * 1)))
  .concat(calcScheduledActivities(start + (86400 * 2)))
  .concat(calcScheduledActivities(start + (86400 * 3)))
  .concat(calcScheduledActivities(start + (86400 * 4)))
  .concat(calcScheduledActivities(start + (86400 * 5)))
  .concat(calcScheduledActivities(start + (86400 * 6)));

export const agentSchedule = (start2) => ({
  col1: `${faker.name.firstName()} ${faker.name.lastName()}`,
  col2: `team ${faker.finance.creditCardCVV()}`,
  col3: 40,
  col4: '8',
  col5: faker.address.timeZone(),
  col6: faker.random.boolean(),
  col7: faker.random.boolean(),
  col8: scheduledActivitiesPlus(start2),
});

export const agentShedules = new Array(100).fill({}).map(() => agentSchedule(starter()));