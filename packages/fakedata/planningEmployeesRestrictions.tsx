import { IPayload } from '@cx/types/api';
import * as faker from 'faker';
import { DateTime } from 'luxon';

export const restriction = (cond: boolean, isDefault: boolean) => ({
  id: faker.random.uuid(),
  name: isDefault ? 'Default Restriction Set' : faker.fake('{{name.lastName}}, {{name.firstName}}'),
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
  validFrom: isDefault ? new Date() : Math.random() < 0.5 ? faker.date.recent() : faker.date.past(),
  isDefault,
});

const defaultRestrictionSet = restriction(true, true);

export const allRestrictions = [
  defaultRestrictionSet,
  ...new Array(25).fill({}).map((_, index: number) => restriction(Math.floor(Math.random() * 10) % index > 5, false)),
];

export const getRestrictions = (fromDate?: string) => new Promise((resolve, reject) => {
  if (!allRestrictions) {
    return setTimeout(() => reject(new Error('Restrictions not found')), 1000);
  }

  if (fromDate) {
    const from = DateTime.fromISO(fromDate).toMillis();
    const restrictionsFromDate = allRestrictions.filter((item: any) => item.validFrom.getTime() >= from);
    return setTimeout(() => resolve({ data: restrictionsFromDate }), 1000);
  }

  return setTimeout(() => resolve({ data: allRestrictions }), 1000);
});

export const updateRestriction = async ({ id, payload }: IPayload) => new Promise((resolve, reject) => {
  const index = allRestrictions.findIndex((r: any) => r.id === id);

  if (index === -1) {
    return setTimeout(() => reject(new Error('Restriction not found')), 1000);
  }

  const result = { ...allRestrictions[index], ...payload };
  allRestrictions[index] = result;

  let message = 'Updated successfully';

  /**
     * If default restriction is being updated, all records with default
     * set must be updated as well
     */
  if (result.isDefault) {
    allRestrictions.forEach((r: any, idx: number) => {
      if (r.defaultSet) {
        allRestrictions[idx] = { ...allRestrictions[idx], ...payload };
      }
    });
    message = 'Updated successfully. All restriction with default set were updated.';
  }

  return setTimeout(() => resolve({ status: 200, data: result, message }), 2000);
});

export const bulkUpdateRestriction = async ({ ids, payload }: IPayload) => new Promise((resolve, reject) => {
  if (!ids) {
    return setTimeout(() => reject(new Error('Array of ids provided is not valid')), 1000);
  }

  const allIds = allRestrictions.map((item: any) => item.id);
  const notFound = ids.filter((id: string | number) => allIds.indexOf(id) < 0);
  if (notFound.length > 0) {
    return setTimeout(() => reject(new Error(`Records not found for ids${notFound.join(', ')}`)), 1000);
  }

  const allResults: any[] = [];
  let hasError = false;
  ids.forEach((id: string | number) => {
    const index = allRestrictions.findIndex((a) => a.id === id);
    if (index === -1) {
      hasError = true;
    }
    const result = { ...allRestrictions[index], ...payload };
    allResults.push(result);
    allRestrictions[index] = result;
  });
  if (hasError) {
    return setTimeout(() => reject(new Error('Restriction not found')), 1000);
  }

  return setTimeout(
    () => resolve({
      status: 200,
      data: allResults,
      message: 'All elements updated successfully',
    }),
    2000,
  );
});
