import * as faker from 'faker';

export const restriction = (cond: boolean) => ({
  id: faker.random.uuid(),
  name: faker.fake('{{name.lastName}}, {{name.firstName}}'),
  defaultSet: Math.random() < 0.4,
  agreedHours: cond ? Math.floor(Math.random() * 50) : null,
  minHours: cond ? Math.floor(Math.random() * 50) : null,
  maxHours: cond ? Math.floor(Math.random() * 50) : null,
  minShift: cond ? Math.floor(Math.random() * 11) : null,
  maxShift: cond ? Math.floor(Math.random() * 11) : null,
  maxShiftFutureChange: cond && Math.random() < 0.3,
  minShiftLength: cond ? Math.floor(Math.random() * 11) : null,
  maxShiftLength: cond ? Math.floor(Math.random() * 11) : null,
  maxWorkDays: cond ? Math.floor(Math.random() * 11) : null,
  maxWeekends: cond ? Math.floor(Math.random() * 11) : null,
  minWeekRest: cond ? Math.floor(Math.random() * 50) : null,
  minNightRest: cond ? Math.floor(Math.random() * 50) : null,
});

export const allRestrictions = new Array(2500)
  .fill({})
  .map((_, index: number) => restriction(Math.floor(Math.random() * 10) % index > 5));

export const getRestrictions = () => new Promise((resolve, reject) => {
  if (!allRestrictions) {
    return setTimeout(() => reject(new Error('Restrictions not found')), 1000);
  }

  return setTimeout(() => resolve({ data: allRestrictions }), 1000);
});
