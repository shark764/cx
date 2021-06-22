import { DashboardSetting } from 'settings/types';

export const dashboardInteractionsInRouting: DashboardSetting = {
  id: 'interactionsInRouting-dashboard',
  name: 'Interactions In IVR Table',
  enabled: true,
  dropdownIndex: '11',
  indentDropdown: 'true',
  widgets: [
    {
      id: 'table-title-widget1',
      type: 'label',
      presentation: { show: true, text: 'Interactions In IVR' },
      sizeX: 34,
      sizeY: 1,
      col: 3,
      row: 0,
    },
    {
      id: 'interactionsInRoutingList',
      type: 'table',
      query: {
        api: 'realtime-statistics',
        endpoint: 'interactions-in-routing-list',
        responseKey: 'interactions',
        parameters: {},
        middleware: [
          'addFlows',
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
                display: 'Flow',
                valuePath: 'name',
                displayPath: 'name',
              },
              name: 'flowName',
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
              header: { display: 'Duration' },
              name: 'currentStateDuration',
              format: 'time',
            },
          ],
          searchOn: ['interactionId'],
          preferenceKey: 'interactionsInRoutingList',
          freezeState: true,
          orderBy: 'interactionId',
          title: 'Interactions in IVR',
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
