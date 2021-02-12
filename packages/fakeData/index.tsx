import * as faker from 'faker';

export const agentSchedule = () => {
  return {
    col1: `${faker.name.firstName()} ${faker.name.lastName()}`,
    col2: `team ${faker.finance.creditCardCVV()}`,
    col3: '40',
    col4: '8',
    col5: faker.address.timeZone(),
    col6: faker.random.boolean(),
    col7: faker.random.boolean(),
  }
};

export const agentShedules = new Array(17).fill({}).map(() => agentSchedule());
