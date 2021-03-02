import { IPayload } from '@cx/types/api';
import * as faker from 'faker';
import { DateTime } from 'luxon';

export const competency = (nQueues: number) => Object.assign(
  {},
  {
    id: faker.random.uuid(),
    name: faker.fake('{{name.lastName}}, {{name.firstName}}'),
    admin: Math.random() < 0.5,
    backOffice: Math.random() < 0.5,
    teamLeader: Math.random() < 0.5,
    teamLeaderFutureChange: Math.random() < 0.1,
    validFrom: Math.random() < 0.5 ? faker.date.past() : faker.date.recent(),
  },
  ...Array.from({ length: nQueues }, (_, idx) => ({
    [`queue-${idx + 1}`]: Math.random() < 0.5,
  })),
);

const nQueues = Math.floor(Math.random() * 6);

export const allCompetencies = new Array(25).fill({}).map(() => competency(nQueues));

export const getCompetencies = (fromDate?: string) => new Promise((resolve, reject) => {
  if (!allCompetencies) {
    return setTimeout(() => reject(new Error('Competencies not found')), 1000);
  }

  if (fromDate) {
    const from = DateTime.fromISO(fromDate).toMillis();
    const competenciesFromDate = allCompetencies.filter((item: any) => item.validFrom.getTime() >= from);
    return setTimeout(() => resolve({ data: competenciesFromDate }), 1000);
  }

  return setTimeout(() => resolve({ data: allCompetencies }), 1000);
});

export function humanizeQueue(s: string) {
  return s.replace('-', ' ').replace(/(?:^|\s)\S/g, (a: string) => a.toUpperCase());
}

export const updateCompetency = async ({ id, payload }: IPayload) => new Promise((resolve, reject) => {
  const index = allCompetencies.findIndex((a) => a.id === id);

  if (index === -1) {
    return setTimeout(() => reject(new Error('Agent not found')), 1000);
  }

  const { competencies = [], queues = [], ...values } = payload;

  const availableCompetencies = ['admin', 'backOffice', 'teamLeader'];
  const competencyValues: any = {};
  availableCompetencies.forEach((c: string) => {
    competencyValues[c] = competencies.includes(c);
  });

  const availableQueues = Object.keys(allCompetencies[index]).filter((k) => k.startsWith('queue-'));
  const queueValues: any = {};
  availableQueues.forEach((q: string) => {
    queueValues[q] = queues.includes(q);
  });

  const result = {
    ...allCompetencies[index],
    ...values,
    ...competencyValues,
    ...queueValues,
  };
  allCompetencies[index] = result;

  return setTimeout(() => resolve({ status: 200, data: result, message: 'Updated successfully' }), 2000);
});
