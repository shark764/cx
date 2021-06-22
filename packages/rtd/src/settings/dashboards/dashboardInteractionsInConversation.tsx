import { DashboardSetting } from 'settings/types';

export const dashboardInteractionsInConversation: DashboardSetting = {
  id: 'interactionsInConversation-dashboard',
  name: 'Interactions In Conversation Table',
  enabled: true,
  dropdownIndex: '13',
  indentDropdown: 'true',
  widgets: [
    {
      id: 'table-title-widget1',
      type: 'label',
      presentation: { show: true, text: 'Interactions In Conversation' },
      sizeX: 34,
      sizeY: 1,
      col: 3,
      row: 0,
    },
    {
      id: 'interactionsInConversationList',
      type: 'table',
      query: {
        api: 'realtime-statistics',
        endpoint: 'interactions-in-conversation-list',
        responseKey: 'interactions',
        parameters: {},
        middleware: [
          'addFlows',
          'addQueues',
          'populateIdCells',
          'permitActions',
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
                display: 'Flow',
                valuePath: 'name',
                displayPath: 'name',
              },
              name: 'flowName',
              checked: false,
            },
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
            { header: { display: 'Customer ID' }, name: 'customer' },
            {
              header: {
                display: 'Contact Point',
                valuePath: 'contactPoint',
                displayPath: 'contactPoint',
              },
              name: 'contactPoint',
            },
            {
              header: { display: 'Start Time' },
              name: 'startTimestamp',
              format: 'timestamp',
              checked: false,
            },
            {
              header: { display: 'In Conversation Time' },
              name: 'currentStateDuration',
              format: 'time',
            },
            { header: { display: 'Agent(s)' }, name: 'agents' },
            {
              header: { display: 'Actions' },
              linkText: 'Monitor Call',
              actionLink: true,
              name: 'action',
            },
            {
              header: { display: 'Custom Attributes', displayPath: 'name' },
              subMenu: true,
              name: 'customAttributes',
              checked: false,
            },
          ],
          searchOn: ['interactionId'],
          preferenceKey: 'interactionsInConversationList',
          freezeState: true,
          orderBy: 'interactionId',
          title: 'Interactions in Conversation',
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
