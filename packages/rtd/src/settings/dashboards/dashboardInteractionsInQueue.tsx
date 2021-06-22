import { DashboardSetting } from 'settings/types';

export const dashboardInteractionsInQueue: DashboardSetting = {
  id: 'interactionsInQueue-dashboard',
  name: 'Interactions In Queue Table',
  enabled: true,
  dropdownIndex: '12',
  indentDropdown: 'true',
  widgets: [
    {
      id: 'table-title-widget1',
      type: 'label',
      presentation: { show: true, text: 'Interactions In Queue' },
      sizeX: 34,
      sizeY: 1,
      col: 3,
      row: 0,
    },
    {
      id: 'interactionsInQueueList',
      type: 'table',
      query: {
        api: 'realtime-statistics',
        endpoint: 'interactions-in-queue-list',
        responseKey: 'interactions',
        parameters: {},
        middleware: [
          'addFlows',
          'addQueues',
          'formatTimeCells',
          'mapDirectionNames',
          'mapChannelTypeNames',
        ],
        customMiddleware: ['addCustomAttributes'],
      },
      presentation: {
        tableConfig: {
          fields: [
            { header: { display: 'Interaction ID' }, name: 'interactionId' },
            {
              header: {
                display: 'Queue',
                valuePath: 'name',
                displayPath: 'name',
              },
              name: 'queueName',
            },
            {
              header: {
                display: 'Contact Point',
                valuePath: 'contactPoint',
                displayPath: 'contactPoint',
              },
              name: 'contactPoint',
            },
            { header: { display: 'Customer ID' }, name: 'customer' },
            {
              header: { display: 'Avg Answer Time' },
              name: 'avgTimeToAnswer',
              format: 'time',
            },
            {
              header: { display: 'In-Queue Time' },
              name: 'currentStateDuration',
              format: 'time',
              checked: false,
            },
            {
              header: {
                display: 'Channel',
                valuePath: 'name',
                displayPath: 'name',
                options: [
                  { name: 'Email' },
                  { name: 'Messaging' },
                  { name: 'SMS' },
                  { name: 'Voice' },
                  { name: 'Work Item' },
                ],
              },
              name: 'channelType',
              checked: false,
            },
            {
              header: {
                display: 'Direction',
                valuePath: 'name',
                displayPath: 'name',
                options: [
                  { name: 'Agent Initiated' },
                  { name: 'Inbound' },
                  { name: 'Outbound' },
                ],
              },
              name: 'direction',
              checked: false,
            },
            {
              header: {
                display: 'Flow',
                valuePath: 'name',
                displayPath: 'name',
              },
              name: 'flowName',
              checked: false,
            },
            {
              header: { display: 'Start Time' },
              name: 'startTimestamp',
              format: 'timestamp',
              checked: false,
            },
            {
              header: { display: 'Custom Attributes', displayPath: 'name' },
              subMenu: true,
              name: 'customAttributes',
              checked: false,
            },
          ],
          searchOn: ['interactionId'],
          preferenceKey: 'interactionsInQueueList',
          freezeState: true,
          orderBy: 'interactionId',
          title: 'Interactions in Queue',
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
