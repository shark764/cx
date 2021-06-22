import { DashboardSetting } from 'settings/types';

export const dashboardInteractionsCompleted: DashboardSetting = {
  id: 'interactionsCompleted-dashboard',
  name: 'Interactions Completed Table',
  enabled: true,
  dropdownIndex: '13',
  indentDropdown: 'true',
  widgets: [
    {
      id: 'table-title-widget1',
      type: 'label',
      presentation: { show: true, text: 'Interactions Completed' },
      sizeX: 34,
      sizeY: 1,
      col: 3,
      row: 0,
    },
    {
      id: 'completedInteractionsList',
      type: 'table',
      query: {
        api: 'realtime-statistics',
        endpoint: 'completed-interactions-list',
        responseKey: 'interactions',
        parameters: {},
        middleware: [
          'addFlows',
          'addQueues',
          'populateIdCells',
          'formatTimeCells',
          'mapDirectionNames',
          'mapChannelTypeNames',
        ],
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
            { header: { display: 'Customer ID' }, name: 'customer' },
            { header: { display: 'Contact Point' }, name: 'contactPoint' },
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
            },
            { header: { display: 'Agent(s)' }, name: 'agents' },
            {
              header: { display: 'Duration' },
              name: 'interactionDuration',
              format: 'time',
            },
          ],
          searchOn: ['id'],
          preferenceKey: 'completedInteractionsList',
          freezeState: true,
          orderBy: 'id',
          title: 'Interactions Completed',
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
