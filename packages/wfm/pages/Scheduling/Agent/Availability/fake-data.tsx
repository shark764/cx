export const data = [
  {
    id: '7020cc7e-68d3-11eb-9439-0242ac130002',
    agentId: 'b47027e0-1126-11ea-953d-9bdc6d6573af',
    tenantId: '7b5c0b99-bd29-4b19-bedd-5aa56f607c8d',
    sunday: { start: '07:00 AM', end: '08:00 PM' },
    monday: { start: '07:00 AM', end: '08:00 PM' },
    tuesday: { start: '07:00 AM', end: '09:00 PM' },
    wednesday: null,
    thursday: { start: '10:00 AM', end: '10:00 PM' },
    friday: { start: '10:00 AM', end: '10:00 PM' },
    saturday: { start: '09:00 AM', end: '07:00 PM' },
  },
];

export const getAvailability = () =>
  new Promise((resolve, reject) => {
    if (!data) {
      return setTimeout(() => reject(new Error('Agents not found')), 1000);
    }

    return setTimeout(() => resolve({ data }), 1000);
  });

export const getAgentAvailability = (id: any) =>
  new Promise((resolve, reject) => {
    const agentAvailability = data.filter((item) => item.agentId === id);

    if (!agentAvailability.length) {
      return setTimeout(
        () => reject(new Error('Agent availability not found')),
        1000
      );
    }

    return setTimeout(() => resolve({ data: agentAvailability }), 1000);
  });
