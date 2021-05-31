import * as faker from 'faker';
import { DateTime } from 'luxon';

import { addDays, getMonday } from '@cx/utilities/date';

const now = new Date();
const monday = getMonday(now);
const days = {
  monday,
  tuesday: addDays(monday, 1),
  wednesday: addDays(monday, 2),
  thursday: addDays(monday, 3),
  friday: addDays(monday, 4),
  saturday: addDays(monday, 5),
  sunday: addDays(monday, 6),
};

const styles = {
  agent: {
    backgroundColor: '#4682b4',
    color: '#222222',
    borderColor: '#2c3e50',
    overflow: 'visible',
  },
  break: {
    backgroundColor: '#a9a9a9',
    color: '#222222',
    borderColor: '#2c3e50',
    overflow: 'visible',
  },
  lunch: {
    backgroundColor: '#fffacd',
    color: '#222222',
    borderColor: '#2c3e50',
    overflow: 'visible',
  },
  meeting: {
    backgroundColor: '#7fffd4',
    color: '#222222',
    borderColor: '#2c3e50',
    overflow: 'visible',
  },
  backOffice: {
    backgroundColor: '#e9967a',
    color: '#222222',
    borderColor: '#2c3e50',
    overflow: 'visible',
  },
  teamLeader: {
    backgroundColor: '#fffafa',
    color: '#222222',
    borderColor: '#2c3e50',
    overflow: 'visible',
  },
};

export const agentId = faker.datatype.uuid();
export const tenantId = faker.datatype.uuid();

export const events = [
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Agent',
    activityType: 'hours-worked',
    style: styles.agent,
    start: new Date(days.monday.setHours(7, 0, 0)),
    end: new Date(days.monday.setHours(10, 0, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Break',
    activityType: 'break',
    style: styles.break,
    start: new Date(days.monday.setHours(10, 0, 0)),
    end: new Date(days.monday.setHours(10, 30, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Agent',
    activityType: 'hours-worked',
    style: styles.agent,
    start: new Date(days.monday.setHours(10, 30, 0)),
    end: new Date(days.monday.setHours(12, 0, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Lunch',
    activityType: 'meal',
    style: styles.lunch,
    start: new Date(days.monday.setHours(12, 0, 0)),
    end: new Date(days.monday.setHours(12, 30, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Meeting',
    activityType: 'meeting',
    style: styles.meeting,
    start: new Date(days.monday.setHours(12, 30, 0)),
    end: new Date(days.monday.setHours(13, 30, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Back Office',
    activityType: 'back-office',
    style: styles.backOffice,
    start: new Date(days.monday.setHours(13, 30, 0)),
    end: new Date(days.monday.setHours(14, 30, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Break',
    activityType: 'break',
    style: styles.break,
    start: new Date(days.monday.setHours(14, 30, 0)),
    end: new Date(days.monday.setHours(15, 0, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Back Office',
    activityType: 'back-office',
    style: styles.backOffice,
    start: new Date(days.monday.setHours(15, 0, 0)),
    end: new Date(days.monday.setHours(16, 0, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Agent',
    activityType: 'hours-worked',
    style: styles.agent,
    start: new Date(days.tuesday.setHours(7, 0, 0)),
    end: new Date(days.tuesday.setHours(10, 0, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Break',
    activityType: 'break',
    style: styles.break,
    start: new Date(days.tuesday.setHours(10, 0, 0)),
    end: new Date(days.tuesday.setHours(10, 30, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Agent',
    activityType: 'hours-worked',
    style: styles.agent,
    start: new Date(days.tuesday.setHours(10, 30, 0)),
    end: new Date(days.tuesday.setHours(12, 0, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Lunch',
    activityType: 'meal',
    style: styles.lunch,
    start: new Date(days.tuesday.setHours(12, 0, 0)),
    end: new Date(days.tuesday.setHours(12, 30, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Agent',
    activityType: 'hours-worked',
    style: styles.agent,
    start: new Date(days.tuesday.setHours(12, 30, 0)),
    end: new Date(days.tuesday.setHours(14, 0, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Break',
    activityType: 'break',
    style: styles.break,
    start: new Date(days.tuesday.setHours(14, 0, 0)),
    end: new Date(days.tuesday.setHours(14, 30, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Back Office',
    activityType: 'back-office',
    style: styles.backOffice,
    start: new Date(days.tuesday.setHours(14, 30, 0)),
    end: new Date(days.tuesday.setHours(16, 0, 0)),
  },
  {
    id: '34a0199a',
    agentId,
    tenantId,
    title: 'Teamleader',
    activityType: 'hours-worked',
    style: styles.teamLeader,
    start: new Date(days.thursday.setHours(14, 0, 0)),
    end: new Date(days.thursday.setHours(16, 0, 0)),
  },
  {
    id: '3ebd5c58',
    agentId,
    tenantId,
    title: 'Break',
    activityType: 'break',
    style: styles.break,
    start: new Date(days.thursday.setHours(16, 0, 0)),
    end: new Date(days.thursday.setHours(16, 30, 0)),
  },
  {
    id: '54e9fff4',
    agentId,
    tenantId,
    title: 'Teamleader',
    activityType: 'hours-worked',
    style: styles.teamLeader,
    start: new Date(days.thursday.setHours(16, 30, 0)),
    end: new Date(days.thursday.setHours(19, 0, 0)),
  },
  {
    id: 'beb3dc34',
    agentId,
    tenantId,
    title: 'Lunch',
    activityType: 'meal',
    style: styles.lunch,
    start: new Date(days.thursday.setHours(19, 0, 0)),
    end: new Date(days.thursday.setHours(19, 30, 0)),
  },
  {
    id: '203ebafa',
    agentId,
    tenantId,
    title: 'Teamleader',
    activityType: 'hours-worked',
    style: styles.teamLeader,
    start: new Date(days.thursday.setHours(19, 30, 0)),
    end: new Date(days.thursday.setHours(21, 30, 0)),
  },
  {
    id: '53758d2c',
    agentId,
    tenantId,
    title: 'Break',
    activityType: 'break',
    style: styles.break,
    start: new Date(days.thursday.setHours(21, 30, 0)),
    end: new Date(days.thursday.setHours(22, 0, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Teamleader',
    activityType: 'hours-worked',
    style: styles.teamLeader,
    start: new Date(days.thursday.setHours(22, 0, 0)),
    end: new Date(days.thursday.setHours(23, 30, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Teamleader',
    activityType: 'hours-worked',
    style: styles.teamLeader,
    start: new Date(days.friday.setHours(14, 0, 0)),
    end: new Date(days.friday.setHours(15, 30, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Break',
    activityType: 'break',
    style: styles.break,
    start: new Date(days.friday.setHours(15, 30, 0)),
    end: new Date(days.friday.setHours(16, 0, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Teamleader',
    activityType: 'hours-worked',
    style: styles.teamLeader,
    start: new Date(days.friday.setHours(16, 0, 0)),
    end: new Date(days.friday.setHours(19, 0, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Lunch',
    activityType: 'meal',
    style: styles.lunch,
    start: new Date(days.friday.setHours(19, 0, 0)),
    end: new Date(days.friday.setHours(19, 30, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Teamleader',
    activityType: 'hours-worked',
    style: styles.teamLeader,
    start: new Date(days.friday.setHours(19, 30, 0)),
    end: new Date(days.friday.setHours(21, 30, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Break',
    activityType: 'break',
    style: styles.break,
    start: new Date(days.friday.setHours(21, 30, 0)),
    end: new Date(days.friday.setHours(22, 0, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Teamleader',
    activityType: 'hours-worked',
    style: styles.teamLeader,
    start: new Date(days.friday.setHours(22, 0, 0)),
    end: new Date(days.friday.setHours(23, 30, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Agent',
    activityType: 'hours-worked',
    style: styles.agent,
    start: new Date(days.saturday.setHours(10, 0, 0)),
    end: new Date(days.saturday.setHours(13, 0, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Break',
    activityType: 'break',
    style: styles.break,
    start: new Date(days.saturday.setHours(13, 0, 0)),
    end: new Date(days.saturday.setHours(13, 30, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Agent',
    activityType: 'hours-worked',
    style: styles.agent,
    start: new Date(days.saturday.setHours(13, 30, 0)),
    end: new Date(days.saturday.setHours(15, 0, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Lunch',
    activityType: 'meal',
    style: styles.lunch,
    start: new Date(days.saturday.setHours(15, 0, 0)),
    end: new Date(days.saturday.setHours(15, 30, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Agent',
    activityType: 'hours-worked',
    style: styles.agent,
    start: new Date(days.saturday.setHours(15, 30, 0)),
    end: new Date(days.saturday.setHours(17, 0, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Break',
    activityType: 'break',
    style: styles.break,
    start: new Date(days.saturday.setHours(17, 0, 0)),
    end: new Date(days.saturday.setHours(17, 30, 0)),
  },
  {
    id: faker.datatype.uuid(),
    agentId,
    tenantId,
    title: 'Agent',
    activityType: 'hours-worked',
    style: styles.agent,
    start: new Date(days.saturday.setHours(17, 30, 0)),
    end: new Date(days.saturday.setHours(19, 0, 0)),
  },

  // {
  //   id: 5,
  //   title: 'Conference',
  //   start: new Date(2015, 3, 11),
  //   end: new Date(2015, 3, 13),
  //   desc: 'Big conference for important people',
  // },

  // {
  //   id: 11.1,
  //   title: 'Inconvenient Conference Call',
  //   start: new Date(2015, 3, 13, 9, 30, 0),
  //   end: new Date(2015, 3, 13, 12, 0, 0),
  // },
  // {
  //   id: 11.2,
  //   title: "Project Kickoff - Lou's Shoes",
  //   start: new Date(2015, 3, 13, 11, 30, 0),
  //   end: new Date(2015, 3, 13, 14, 0, 0),
  // },
  // {
  //   id: 11.3,
  //   title: 'Quote Follow-up - Tea by Tina',
  //   start: new Date(2015, 3, 13, 15, 30, 0),
  //   end: new Date(2015, 3, 13, 16, 0, 0),
  // },
  // {
  //   id: 12.5,
  //   title: 'Late Same Night Event',
  //   start: new Date(2015, 3, 17, 19, 30, 0),
  //   end: new Date(2015, 3, 17, 23, 30, 0),
  // },
  // {
  //   id: 13,
  //   title: 'Multi-day Event',
  //   start: new Date(2015, 3, 20, 19, 30, 0),
  //   end: new Date(2015, 3, 22, 2, 0, 0),
  // },
];

export const getSchedule = () => new Promise((resolve, reject) => {
  if (!events) {
    return setTimeout(() => reject(new Error('Agents not found')), 1000);
  }

  return setTimeout(() => resolve({ data: events }), 1000);
});

/**
 * @param {String | Number} id
 * @param {String} fromDate
 * @param {String} toDate
 */
export const getAgentSchedule = (id: string | number, fromDate: string, toDate: string) => new Promise((resolve) => {
  const from = DateTime.fromISO(fromDate).toMillis();
  const to = DateTime.fromISO(toDate).toMillis();

  const agentSchedule = events.filter((event) => {
    const evStartDate = event.start.getTime();
    const evEndDate = event.end.getTime();

    const inRange = (evStartDate >= from && evStartDate <= to) || (evEndDate >= from && evEndDate <= to);
    return event.agentId === id && inRange;
  });

  // if (!agentSchedule.length) {
  //   return setTimeout(
  //     () => reject(new Error('Agent schedule not found')),
  //     1000
  //   );
  // }

  return setTimeout(() => resolve({ data: agentSchedule }), 1000);
});
