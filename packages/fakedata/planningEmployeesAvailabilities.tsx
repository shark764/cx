import { IPayload } from '@cx/types/api';
import { addDays } from '@cx/utilities/date';
import * as faker from 'faker';
import { apiCall } from '@cx/utilities/api';
import { allAgentsInformation } from './planningEmployeesAgents';

const shiftTimes = ['04:00', '06:00', '07:00', '08:00', '10:00', '11:00', '12:00'];
const amPm = ['AM', 'PM'];

export const availability = () => ({
  id: faker.datatype.uuid(),
  agentId: faker.datatype.uuid(),
  agent: faker.fake('{{name.lastName}}, {{name.firstName}}'),
  agreedHours: Math.floor(Math.random() * 50),
});

export const allAvailabilities = new Array(25).fill({}).map(() => availability());

export const fetchAvailabilities = (): Promise<any> => new Promise((resolve, reject) => {
  if (!allAvailabilities) {
    return setTimeout(() => reject(new Error('Availabilities not found')), 1000);
  }

  return setTimeout(() => resolve({ data: allAvailabilities }), 1000);
});

export const getAvailabilities = (): Promise<any> => apiCall(fetchAvailabilities());

export const week = (agentId: string, index: number) => ({
  // id: faker.datatype.uuid(),
  agentId,
  week: index,
  sundayAvailable: Math.random() < 0.5 ? 'available' : 'unavailable',
  sundayStart:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : '',
  sundayEnd:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : '',
  mondayAvailable: Math.random() < 0.5 ? 'available' : 'unavailable',
  mondayStart:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : '',
  mondayEnd:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : '',
  tuesdayAvailable: Math.random() < 0.5 ? 'available' : 'unavailable',
  tuesdayStart:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : '',
  tuesdayEnd:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : '',
  wednesdayAvailable: Math.random() < 0.5 ? 'available' : 'unavailable',
  wednesdayStart:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : '',
  wednesdayEnd:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : '',
  thursdayAvailable: Math.random() < 0.5 ? 'available' : 'unavailable',
  thursdayStart:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : '',
  thursdayEnd:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : '',
  fridayAvailable: Math.random() < 0.5 ? 'available' : 'unavailable',
  fridayStart:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : '',
  fridayEnd:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : '',
  saturdayAvailable: Math.random() < 0.5 ? 'available' : 'unavailable',
  saturdayStart:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : '',
  saturdayEnd:
    Math.random() < 0.8 ? `${shiftTimes[Math.floor(Math.random() * 7)]} ${amPm[Math.random() >= 0.5 ? 1 : 0]}` : '',
});

export const timetable = (aval: any, agentId: string) => {
  const connectToAgent = Math.random() < 0.5 ? allAgentsInformation[Math.floor(Math.random() * 25)] : null;
  const nWeeks = Math.floor(Math.random() * 5);
  return {
    id: faker.datatype.uuid(),
    agentId,
    name: connectToAgent ? `${aval.agent.split(' ')[1]} and ${connectToAgent.name.split(' ')[1]}` : faker.name.title(),
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    weeks: new Array(nWeeks).fill({}).map((_, index: number) => week(agentId, index + 1)),
    submitChangesTimeTable: false,
    saveAsTimetable: false,
    newName: '',
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

export const fetchAgentAvailabilityTimeTable = (agentId: string): Promise<any> => new Promise((resolve, reject) => {
  if (!allTimeTables) {
    return setTimeout(() => reject(new Error('Agent Availability Timetable not found')), 1000);
  }

  const agentAvailabilityTimeTable = allTimeTables.filter((item: any) => item.agentId === agentId);

  return setTimeout(() => resolve({ data: agentAvailabilityTimeTable }), 1000);
});

export const getAgentAvailabilityTimeTable = (agentId): Promise<any> => apiCall(fetchAgentAvailabilityTimeTable(agentId));

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
    connectTo: allAgentsInformation.find((agentItem: any) => agentItem.id === payload.connectTo),
  };
  allTimeTables[index] = result;

  if (payload.saveAsTimetable) {
    const newTimetable = {
      ...result,
      id: faker.datatype.uuid(),
      name: payload.newName,
      startDate: payload.newStartDate,
      endDate: payload.newEndDate,
      saveAsTimetable: false,
      newName: '',
      newStartDate: '',
      newEndDate: '',
    };
    allTimeTables.push(newTimetable);
  }

  return setTimeout(() => resolve({ status: 200, data: result, message: 'Updated successfully' }), 2000);
});
