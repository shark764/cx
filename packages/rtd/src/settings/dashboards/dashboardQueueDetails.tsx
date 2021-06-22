import { DashboardSetting } from 'settings/types';

export const dashboardQueueDetails: DashboardSetting = {
  id: 'queueDetails-dashboard',
  name: 'Queue Details Table',
  enabled: true,
  dropdownIndex: '21',
  indentDropdown: 'true',
  widgets: [
    {
      id: 'table-title-widget1',
      type: 'label',
      presentation: { show: true, text: 'Queue Details' },
      sizeX: 34,
      sizeY: 1,
      col: 3,
      row: 0,
    },
    {
      id: 'queueDetailsList',
      type: 'table',
      query: {
        api: 'realtime-statistics',
        endpoint: 'queue-details-list',
        responseKey: 'details',
        parameters: { 'queue-id': 'queues' },
        middleware: ['addQueues', 'formatTimeCells'],
      },
      presentation: {
        tableConfig: {
          fields: [
            {
              header: {
                display: 'Queue',
                valuePath: 'name',
                displayPath: 'name',
              },
              name: 'queueName',
            },
            {
              header: { display: 'Queue Service Level' },
              name: 'serviceLevel',
            },
            { header: { display: 'Queue Abandons' }, name: 'abandonCount' },
            { header: { display: 'Queue Length' }, name: 'queueLength' },
            {
              header: { display: 'Avg Queue Time' },
              name: 'avgQueueDuration',
              format: 'time',
            },
          ],
          searchOn: ['interactionId'],
          preferenceKey: 'queueDetailsList',
          freezeState: true,
          orderBy: 'interactionId',
          title: 'Queue Details',
          header: { all: true },
          showBulkActions: false,
          showCreate: false,
          showSearch: false,
          showColumns: true,
          sref: '',
        },
      },
      sizeX: 34,
      sizeY: 14,
      col: 3,
      row: 1,
    },
  ],
};
