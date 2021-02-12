import * as faker from 'faker';
import { randomUniform } from 'd3';
export const agentSchedule = () => {
  return {
    col1: `${faker.name.firstName()} ${faker.name.lastName()}`,
    col2: `team ${faker.finance.creditCardCVV()}`,
    col3: 40,
    col4: '8',
    col5: faker.address.timeZone(),
    col6: faker.random.boolean(),
    col7: faker.random.boolean(),
    col8: daySegment()
  }
};

// day is between 0 and 86400 seconds
export const daySegment = () => {
  const startShift = randomStartHour();
  const shiftLength = 28800;
  return {
    shiftStartTime: startShift,
    shiftLength: shiftLength,
    breaks: [{
      name: 'lunch',
      breakStartTime: startShift + (shiftLength / 2) - 3600,
      breakLength: 3600
    }],
  };
};


const randomStartHour = () => randomUniform(0, 16)() * 3600;

export const agentShedules = new Array(17).fill({}).map(() => agentSchedule());
