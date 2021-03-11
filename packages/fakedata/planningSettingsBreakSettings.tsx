import { IPayload } from '@cx/types/api';
import * as faker from 'faker';

const shiftTimes = ['04:00', '06:00', '07:00', '08:00', '10:00', '11:00', '12:00'];
const breakTimes = [
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30',
  '04:00',
  '04:30',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '10:00',
  '11:00',
  '12:00',
];
const amPm = ['AM', 'PM'];

const breakTime = () => ({
  breakType: Math.random() < 0.5 ? 'paid' : 'unpaid',
  minTimeBeforeBreak: breakTimes[Math.floor(Math.random() * 15)],
  maxTimeBeforeBreak: breakTimes[Math.floor(Math.random() * 15)],
  duration: Math.floor(Math.random() * 30),
});

export const breakSetting = () => ({
  id: faker.random.uuid(),
  shiftStartTimeFrom: `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}`,
  shiftStartTimeTo: `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}`,
  minShiftLength: shiftTimes[Math.floor(Math.random() * 7)],
  maxShiftLength: shiftTimes[Math.floor(Math.random() * 7)],
  minTimeBetweenBreaks: shiftTimes[Math.floor(Math.random() * 7)],
  breaks: new Array(Math.floor(Math.random() * 4)).fill({}).map(() => breakTime()),
  monday: Math.random() < 0.5,
  tuesday: Math.random() < 0.5,
  wednesday: Math.random() < 0.5,
  thursday: Math.random() < 0.5,
  friday: Math.random() < 0.5,
  saturday: Math.random() < 0.5,
  sunday: Math.random() < 0.5,
});

export const allBreakSettings = new Array(10).fill({}).map(() => breakSetting());

export const getBreakSettings = () => new Promise((resolve, reject) => {
  if (!allBreakSettings) {
    return setTimeout(() => reject(new Error('BreakSettings not found')), 1000);
  }

  return setTimeout(() => resolve({ data: allBreakSettings }), 1000);
});

export const updateBreakSettings = async ({ id, payload }: IPayload) => new Promise((resolve, reject) => {
  const index = allBreakSettings.findIndex((a) => a.id === id);

  if (index === -1) {
    return setTimeout(() => reject(new Error('Agent not found')), 1000);
  }

  const result = {
    ...allBreakSettings[index],
    ...payload,
  };
  allBreakSettings[index] = result;

  return setTimeout(() => resolve({ status: 200, data: result, message: 'Updated successfully' }), 2000);
});

export const deleteBreakSettings = async (id: string) => new Promise((resolve, reject) => {
  const index = allBreakSettings.findIndex((a) => a.id === id);

  if (index === -1) {
    return setTimeout(() => reject(new Error('Agent not found')), 1000);
  }

  const result = allBreakSettings[index];

  allBreakSettings.splice(index, 1);

  return setTimeout(() => resolve({ status: 200, data: result, message: 'Element removed successfully' }), 2000);
});
