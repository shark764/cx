import * as faker from 'faker';

export const competency = (nQueues: number) => Object.assign(
  {},
  {
    name: faker.fake('{{name.lastName}}, {{name.firstName}}'),
    admin: Math.random() < 0.5,
    backOffice: Math.random() < 0.5,
    teamLeader: Math.random() < 0.5,
    teamLeaderFutureChange: Math.random() < 0.1,
  },
  ...Array.from({ length: nQueues }, (_, idx) => ({
    [`queue-${++idx}`]: Math.random() < 0.5,
  })),
);

const nQueues = Math.floor(Math.random() * 6);

export const allCompetencies = new Array(25).fill({}).map(() => competency(nQueues));

export const getCompetencies = () => new Promise((resolve, reject) => {
  if (!allCompetencies) {
    return setTimeout(() => reject(new Error('Competencies not found')), 1000);
  }

  return setTimeout(() => resolve({ data: allCompetencies }), 1000);
});

export function humanizeQueue(s: string) {
  return s.replace('-', ' ').replace(/(?:^|\s)\S/g, (a: string) => a.toUpperCase());
}
