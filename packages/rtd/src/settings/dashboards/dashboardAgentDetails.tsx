import { DashboardSetting } from 'settings/types';

export const dashboardAgentDetails: DashboardSetting = {
  id: 'AgentDetails-dashboard',
  name: 'Agent Details Table',
  enabled: true,
  dropdownIndex: '32',
  indentDropdown: 'true',
  widgets: [
    {
      id: 'table-title-widget1',
      type: 'label',
      presentation: { show: true, text: 'Agent Details' },
      sizeX: 34,
      sizeY: 1,
      col: 3,
      row: 0,
    },
    {
      id: 'resourceDetailsList',
      type: 'table',
      query: {
        api: 'realtime-statistics',
        endpoint: 'resource-details-list',
        responseKey: 'json',
        parameters: { 'resource-id': 'resources' },
        middleware: [
          'addAgents',
          'addGroups',
          'addSkills',
          'formatTimeCells',
          'mapStateNames',
        ],
      },
      presentation: {
        tableConfig: {
          fields: [
            {
              header: {
                display: 'Agent',
                valuePath: 'name',
                displayPath: 'name',
              },
              name: 'agentName',
            },
            {
              header: { display: 'Conversation Starts' },
              name: 'conversationStarts',
            },
            {
              header: { display: 'Avg Talk Time' },
              name: 'avgResourceTalkTime',
              format: 'time',
            },
            {
              header: { display: 'Avg Hold Time' },
              name: 'avgResourceHoldDuration',
              format: 'time',
            },
            {
              header: { display: 'Avg Wrap-up Time' },
              name: 'avgResourceWrapUpDuration',
              format: 'time',
            },
            {
              header: {
                display: 'Groups',
                valuePath: 'id',
                displayPath: 'name',
              },
              lookup: 'groups:id',
              name: 'groups',
              id: 'user-groups-table1-column',
              sortOn: 'groups.length',
              filterOrderBy: 'name',
            },
            {
              header: {
                display: 'Skills',
                valuePath: 'id',
                displayPath: 'name',
              },
              lookup: 'skills:id',
              name: 'skills',
              id: 'user-skills-table1-column',
              sortOn: 'skills.length',
              filterOrderBy: 'name',
            },
            {
              header: { display: 'Avg Time to Answer' },
              name: 'avgTimeToAnswer',
              format: 'time',
            },
            {
              header: { display: 'Avg Handle Time' },
              name: 'avgHandleTime',
              format: 'time',
            },
            {
              header: { display: 'Avg Logged in Time' },
              name: 'avgResourceLoggedInTime',
              format: 'time',
            },
          ],
          searchOn: ['interactionId'],
          preferenceKey: 'resourceDetailsList',
          freezeState: true,
          orderBy: 'interactionId',
          title: 'Agent Details',
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
