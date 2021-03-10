import * as faker from 'faker';
import { randomUniform } from 'd3';

export const agentSchedule = () => ({
  col1: `${faker.name.firstName()} ${faker.name.lastName()}`,
  col2: `team ${faker.finance.creditCardCVV()}`,
  col3: 40,
  col4: '8',
  col5: faker.address.timeZone(),
  col6: faker.random.boolean(),
  col7: faker.random.boolean(),
  col8: daySegment(),
});

// day is between 0 and 86400 seconds
export const daySegment = () => {
  const startShift = randomStartHour();
  const shiftLength = 28800;
  return {
    shiftStartTime: startShift,
    shiftLength,
    breaks: [
      {
        name: 'lunch',
        breakStartTime: startShift + shiftLength / 2 - 3600,
        breakLength: 3600,
      },
    ],
  };
};

const randomStartHour = () => randomUniform(0, 16)() * 3600;

export const agentShedules = new Array(17).fill({}).map(() => agentSchedule());


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

const start = Date.now() / 1000;

export const scheduledActivities = calcScheduledActivities(start);

export const scheduledActivitiesPlus = calcScheduledActivities(start)
  .concat(calcScheduledActivities(start + (86400 * 1)))
  .concat(calcScheduledActivities(start + (86400 * 2)))
  .concat(calcScheduledActivities(start + (86400 * 3)))
  .concat(calcScheduledActivities(start + (86400 * 4)))
  .concat(calcScheduledActivities(start + (86400 * 5)))
  .concat(calcScheduledActivities(start + (86400 * 6)));

