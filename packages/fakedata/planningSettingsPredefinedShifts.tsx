import { IPayload } from '@cx/types/api';
import * as faker from 'faker';

const shiftTimes = ['04:00', '06:00', '07:00', '08:00', '10:00', '11:00', '12:00'];
const durations = [
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
const activities = [
  { id: 'agent', name: 'Agent', activityType: 'hours-worked' },
  { id: 'break', name: 'Break', activityType: 'break' },
  { id: 'lunch', name: 'Lunch', activityType: 'meal' },
  { id: 'meeting', name: 'Meeting', activityType: 'meeting' },
  { id: 'backOffice', name: 'Back Office', activityType: 'back-office' },
  { id: 'teamLeader', name: 'TeamLeader', activityType: 'hours-worked' },
];

const shiftActivity = () => ({
  start: durations[Math.floor(Math.random() * 15)],
  duration: durations[Math.floor(Math.random() * 15)],
  activity: activities[Math.floor(Math.random() * 6)],
});

export const predefinedShift = () => {
  const start = `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}`;
  const end = `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}`;
  const shiftActivities = new Array(Math.floor(Math.random() * 5)).fill({}).map(() => shiftActivity());
  return {
    id: faker.datatype.uuid(),
    shiftName: `${shiftActivities[0] ? `${shiftActivities[0].activity.name} ` : ''}${start} - ${end}`,
    start,
    end,
    shiftLength: Math.floor(Math.random() * 9),
    paidHours: Math.floor(Math.random() * 8),
    activities: shiftActivities,
    active: Math.random() < 0.5,
  };
};

export const allPredefinedShifts = new Array(10).fill({}).map(() => predefinedShift());

export const getPredefinedShifts = () => new Promise((resolve, reject) => {
  if (!allPredefinedShifts) {
    return setTimeout(() => reject(new Error('PredefinedShifts not found')), 1000);
  }

  return setTimeout(() => resolve({ data: allPredefinedShifts }), 1000);
});

export const updatePredefinedShifts = async ({ id, payload }: IPayload) => new Promise((resolve, reject) => {
  const index = allPredefinedShifts.findIndex((a) => a.id === id);

  if (index === -1) {
    return setTimeout(() => reject(new Error('Agent not found')), 1000);
  }

  const result = {
    ...allPredefinedShifts[index],
    ...payload,
  };
  allPredefinedShifts[index] = result;

  return setTimeout(() => resolve({ status: 200, data: result, message: 'Updated successfully' }), 2000);
});

export const deletePredefinedShifts = async (id: string) => new Promise((resolve, reject) => {
  const index = allPredefinedShifts.findIndex((a) => a.id === id);

  if (index === -1) {
    return setTimeout(() => reject(new Error('Agent not found')), 1000);
  }

  const result = allPredefinedShifts[index];

  allPredefinedShifts.splice(index, 1);

  return setTimeout(() => resolve({ status: 200, data: result, message: 'Element removed successfully' }), 2000);
});

export const getActivityList = () => new Promise((resolve, reject) => {
  if (!activities) {
    return setTimeout(() => reject(new Error('Activities not found')), 1000);
  }

  return setTimeout(() => resolve({ data: activities }), 1000);
});
