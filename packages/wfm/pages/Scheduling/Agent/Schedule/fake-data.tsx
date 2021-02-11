// import { useTheme } from 'styled-components';

import { addDays, getMonday } from '@cx/wfm/utilities/date';

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

// const theme = useTheme();
// console.log({ theme });

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

export const events = [
  {
    id: '06cb96c6-6623-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Agent',
    style: styles.agent,
    start: new Date(days.monday.setHours(7, 0, 0)),
    end: new Date(days.monday.setHours(10, 0, 0)),
  },
  {
    id: '296ea1ee-662a-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Break',
    style: styles.break,
    start: new Date(days.monday.setHours(10, 0, 0)),
    end: new Date(days.monday.setHours(10, 30, 0)),
  },
  {
    id: '5099e076-662a-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Agent',
    style: styles.agent,
    start: new Date(days.monday.setHours(10, 30, 0)),
    end: new Date(days.monday.setHours(12, 0, 0)),
  },
  {
    id: '98ae0612-662a-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Lunch',
    style: styles.lunch,
    start: new Date(days.monday.setHours(12, 0, 0)),
    end: new Date(days.monday.setHours(12, 30, 0)),
  },
  {
    id: 'bc1549b2-662a-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Meeting',
    style: styles.meeting,
    start: new Date(days.monday.setHours(12, 30, 0)),
    end: new Date(days.monday.setHours(13, 30, 0)),
  },
  {
    id: 'dfa2898a-662a-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Back Office',
    style: styles.backOffice,
    start: new Date(days.monday.setHours(13, 30, 0)),
    end: new Date(days.monday.setHours(14, 30, 0)),
  },
  {
    id: '6070a9ac-662b-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Break',
    style: styles.break,
    start: new Date(days.monday.setHours(14, 30, 0)),
    end: new Date(days.monday.setHours(15, 0, 0)),
  },
  {
    id: '743c1e1c-662b-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Back Office',
    style: styles.backOffice,
    start: new Date(days.monday.setHours(15, 0, 0)),
    end: new Date(days.monday.setHours(16, 0, 0)),
  },
  {
    id: 'c4c9fb2e-662b-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Agent',
    style: styles.agent,
    start: new Date(days.tuesday.setHours(7, 0, 0)),
    end: new Date(days.tuesday.setHours(10, 0, 0)),
  },
  {
    id: 'c937667e-662b-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Break',
    style: styles.break,
    start: new Date(days.tuesday.setHours(10, 0, 0)),
    end: new Date(days.tuesday.setHours(10, 30, 0)),
  },
  {
    id: 'd0ab4f42-662b-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Agent',
    style: styles.agent,
    start: new Date(days.tuesday.setHours(10, 30, 0)),
    end: new Date(days.tuesday.setHours(12, 0, 0)),
  },
  {
    id: 'd592a42e-662b-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Lunch',
    style: styles.lunch,
    start: new Date(days.tuesday.setHours(12, 0, 0)),
    end: new Date(days.tuesday.setHours(12, 30, 0)),
  },
  {
    id: 'd9f8207a-662b-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Agent',
    style: styles.agent,
    start: new Date(days.tuesday.setHours(12, 30, 0)),
    end: new Date(days.tuesday.setHours(14, 0, 0)),
  },
  {
    id: 'ef0dfffc-662b-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Break',
    style: styles.break,
    start: new Date(days.tuesday.setHours(14, 0, 0)),
    end: new Date(days.tuesday.setHours(14, 30, 0)),
  },
  {
    id: 'f24d1626-662b-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Back Office',
    style: styles.backOffice,
    start: new Date(days.tuesday.setHours(14, 30, 0)),
    end: new Date(days.tuesday.setHours(16, 0, 0)),
  },
  {
    id: '34a0199a-6633-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Teamleader',
    style: styles.teamLeader,
    start: new Date(days.thursday.setHours(14, 0, 0)),
    end: new Date(days.thursday.setHours(16, 0, 0)),
  },
  {
    id: '3ebd5c58-6633-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Break',
    style: styles.break,
    start: new Date(days.thursday.setHours(16, 0, 0)),
    end: new Date(days.thursday.setHours(16, 30, 0)),
  },
  {
    id: '54e9fff4-6633-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Teamleader',
    style: styles.teamLeader,
    start: new Date(days.thursday.setHours(16, 30, 0)),
    end: new Date(days.thursday.setHours(19, 0, 0)),
  },
  {
    id: 'beb3dc34-6633-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Lunch',
    style: styles.lunch,
    start: new Date(days.thursday.setHours(19, 0, 0)),
    end: new Date(days.thursday.setHours(19, 30, 0)),
  },
  {
    id: '203ebafa-6634-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Teamleader',
    style: styles.teamLeader,
    start: new Date(days.thursday.setHours(19, 30, 0)),
    end: new Date(days.thursday.setHours(21, 30, 0)),
  },
  {
    id: '53758d2c-6634-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Break',
    style: styles.break,
    start: new Date(days.thursday.setHours(21, 30, 0)),
    end: new Date(days.thursday.setHours(22, 0, 0)),
  },
  {
    id: 'f24d1626-662b-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Teamleader',
    style: styles.teamLeader,
    start: new Date(days.thursday.setHours(22, 0, 0)),
    end: new Date(days.thursday.setHours(23, 30, 0)),
  },
  {
    id: 'e52c3432-6634-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Teamleader',
    style: styles.teamLeader,
    start: new Date(days.friday.setHours(14, 0, 0)),
    end: new Date(days.friday.setHours(15, 30, 0)),
  },
  {
    id: 'edd2f03a-6634-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Break',
    style: styles.break,
    start: new Date(days.friday.setHours(15, 30, 0)),
    end: new Date(days.friday.setHours(16, 0, 0)),
  },
  {
    id: 'f852bdf6-6634-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Teamleader',
    style: styles.teamLeader,
    start: new Date(days.friday.setHours(16, 0, 0)),
    end: new Date(days.friday.setHours(19, 0, 0)),
  },
  {
    id: '00a2a016-6635-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Lunch',
    style: styles.lunch,
    start: new Date(days.friday.setHours(19, 0, 0)),
    end: new Date(days.friday.setHours(19, 30, 0)),
  },
  {
    id: '0794203e-6635-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Teamleader',
    style: styles.teamLeader,
    start: new Date(days.friday.setHours(19, 30, 0)),
    end: new Date(days.friday.setHours(21, 30, 0)),
  },
  {
    id: '0dffc220-6635-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Break',
    style: styles.break,
    start: new Date(days.friday.setHours(21, 30, 0)),
    end: new Date(days.friday.setHours(22, 0, 0)),
  },
  {
    id: '17e00e1c-6635-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Teamleader',
    style: styles.teamLeader,
    start: new Date(days.friday.setHours(22, 0, 0)),
    end: new Date(days.friday.setHours(23, 30, 0)),
  },
  {
    id: '42eecb02-6635-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Agent',
    style: styles.agent,
    start: new Date(days.saturday.setHours(10, 0, 0)),
    end: new Date(days.saturday.setHours(13, 0, 0)),
  },
  {
    id: '4d9b80f4-6635-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Break',
    style: styles.break,
    start: new Date(days.saturday.setHours(13, 0, 0)),
    end: new Date(days.saturday.setHours(13, 30, 0)),
  },
  {
    id: '57b2dc04-6635-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Agent',
    style: styles.agent,
    start: new Date(days.saturday.setHours(13, 30, 0)),
    end: new Date(days.saturday.setHours(15, 0, 0)),
  },
  {
    id: '5bcd4676-6635-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Lunch',
    style: styles.lunch,
    start: new Date(days.saturday.setHours(15, 0, 0)),
    end: new Date(days.saturday.setHours(15, 30, 0)),
  },
  {
    id: '5f11fa7a-6635-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Agent',
    style: styles.agent,
    start: new Date(days.saturday.setHours(15, 30, 0)),
    end: new Date(days.saturday.setHours(17, 0, 0)),
  },
  {
    id: 'a9ff09a6-6635-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Break',
    style: styles.break,
    start: new Date(days.saturday.setHours(17, 0, 0)),
    end: new Date(days.saturday.setHours(17, 30, 0)),
  },
  {
    id: 'ad4c1298-6635-11eb-ae93-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    title: 'Agent',
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

export const getSchedule = () =>
  new Promise((resolve, reject) => {
    if (!events) {
      return setTimeout(() => reject(new Error('Agents not found')), 1000);
    }

    return setTimeout(() => resolve({ data: events }), 1000);
  });

export const getAgentSchedule = (id: string | number) =>
  new Promise((resolve, reject) => {
    const agentSchedule = events.filter((event) => event.agentId === id);

    if (!agentSchedule.length) {
      return setTimeout(
        () => reject(new Error('Agent schedule not found')),
        1000
      );
    }

    return setTimeout(() => resolve({ data: agentSchedule }), 1000);
  });
