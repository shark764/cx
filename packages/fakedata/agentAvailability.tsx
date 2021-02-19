import * as faker from 'faker';

export const agentId = faker.random.uuid();
export const tenantId = faker.random.uuid();

export const data = [
  {
    id: faker.random.uuid(),
    agentId,
    tenantId,
    sunday: { start: '07:00 AM', end: '08:00 PM' },
    monday: { start: '07:00 AM', end: '08:00 PM' },
    tuesday: { start: '07:00 AM', end: '09:00 PM' },
    wednesday: null,
    thursday: { start: '10:00 AM', end: '10:00 PM' },
    friday: { start: '10:00 AM', end: '10:00 PM' },
    saturday: { start: '09:00 AM', end: '07:00 PM' },
  },
];

export const getAvailability = () => new Promise((resolve, reject) => {
  if (!data) {
    return setTimeout(() => reject(new Error('Agents not found')), 1000);
  }

  return setTimeout(() => resolve({ data }), 1000);
});

export const getAgentAvailability = (id: any) => new Promise((resolve, reject) => {
  const agentAvailability = data.filter((item) => item.agentId === id);

  if (!agentAvailability.length) {
    return setTimeout(() => reject(new Error('Agent availability not found')), 1000);
  }

  return setTimeout(() => resolve({ data: agentAvailability }), 1000);
});
