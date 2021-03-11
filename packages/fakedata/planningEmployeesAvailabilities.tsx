import { IPayload } from '@cx/types/api';
import { addDays } from '@cx/utilities/date';
import * as faker from 'faker';
import { allAgentsInformation } from './planningEmployeesAgents';

const shiftTimes = ['04:00', '06:00', '07:00', '08:00', '10:00', '11:00', '12:00'];
const amPm = ['AM', 'PM'];

export const availability = () => ({
  id: faker.random.uuid(),
  agentId: faker.random.uuid(),
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

export const week = (agentId: string, index: number) => ({
  // id: faker.random.uuid(),
  agentId,
  week: index,
  sundayAvailable: Math.random() < 0.5 ? 'available' : 'unavailable',
  sundayStart:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : null,
  sundayEnd:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : null,
  mondayAvailable: Math.random() < 0.5 ? 'available' : 'unavailable',
  mondayStart:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : null,
  mondayEnd:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : null,
  tuesdayAvailable: Math.random() < 0.5 ? 'available' : 'unavailable',
  tuesdayStart:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : null,
  tuesdayEnd:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : null,
  wednesdayAvailable: Math.random() < 0.5 ? 'available' : 'unavailable',
  wednesdayStart:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : null,
  wednesdayEnd:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : null,
  thursdayAvailable: Math.random() < 0.5 ? 'available' : 'unavailable',
  thursdayStart:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : null,
  thursdayEnd:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : null,
  fridayAvailable: Math.random() < 0.5 ? 'available' : 'unavailable',
  fridayStart:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : null,
  fridayEnd:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : null,
  saturdayAvailable: Math.random() < 0.5 ? 'available' : 'unavailable',
  saturdayStart:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : null,
  saturdayEnd:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : null,
});

export const timetable = (aval: any, agentId: string) => {
  const connectToAgent = Math.random() < 0.5 ? allAgentsInformation[Math.floor(Math.random() * 25)] : null;
  const nWeeks = Math.floor(Math.random() * 5);
  return {
    id: faker.random.uuid(),
    agentId,
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    weeks: new Array(nWeeks).fill({}).map((_, index: number) => week(agentId, index + 1)),
    submitChangesTimeTable: false,
    saveAsTimeTable: false,
    name: connectToAgent ? `${aval.agent.split(' ')[1]} and ${connectToAgent.name.split(' ')[1]}` : faker.name.title(),
    newStartDate: '',
    newEndDate: '',
    connectTo: connectToAgent,
  };
};

export const allTimeTables: any[] = [];
allAvailabilities.forEach((aval) => {
  const nTimeTables = Math.floor(Math.random() * 5);
  const agentTimeTable = new Array(nTimeTables).fill({}).map(() => timetable(aval, aval.agentId));
  agentTimeTable.forEach((ttable: any) => {
    allTimeTables.push(ttable);
  });
});

export const getAgentAvailabilityTimeTable = (agentId: string) => new Promise((resolve, reject) => {
  if (!allTimeTables) {
    return setTimeout(() => reject(new Error('Agent Availability Timetable not found')), 1000);
  }

  const agentAvailabilityTimeTable = allTimeTables.filter((item: any) => item.agentId === agentId);

  return setTimeout(() => resolve({ data: agentAvailabilityTimeTable }), 1000);
});

export const updateAvailability = async ({ id, payload }: IPayload) => new Promise((resolve, reject) => {
  const index = allAvailabilities.findIndex((a) => a.id === id);

  if (index === -1) {
    return setTimeout(() => reject(new Error('Availability not found')), 1000);
  }

  const result = {
    ...allAvailabilities[index],
    ...payload,
  };
  allAvailabilities[index] = result;

  return setTimeout(() => resolve({ status: 200, data: result, message: 'Updated successfully' }), 2000);
});

export const updateAvailabilityTimeTable = async ({ id, payload }: IPayload) => new Promise((resolve, reject) => {
  const index = allTimeTables.findIndex((a) => a.id === id);

  if (index === -1) {
    return setTimeout(() => reject(new Error('Availability Timetable not found')), 1000);
  }

  const result = {
    ...allTimeTables[index],
    ...payload,
  };
  allTimeTables[index] = result;

  return setTimeout(() => resolve({ status: 200, data: result, message: 'Updated successfully' }), 2000);
});
