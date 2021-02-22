import * as faker from 'faker';

export const availability = () => ({
  id: faker.random.uuid(),
  agent: faker.fake('{{name.lastName}}, {{name.firstName}}'),
  agreedHours: Math.floor(Math.random() * 50),
});

export const allAvailabilities = new Array(25).fill({}).map(() => availability());

export const getAvailabilities = () => new Promise((resolve, reject) => {
  if (!allAvailabilities) {
    return setTimeout(() => reject(new Error('Availabilities not found')), 1000);
  }

  return setTimeout(() => resolve({ data: allAvailabilities }), 1000);
});
