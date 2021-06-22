import { DashboardSetting } from 'settings/types';

export const dashboardAgentState: DashboardSetting = {
  id: 'AgentState-dashboard',
  name: 'Agent State Table',
  enabled: true,
  dropdownIndex: '31',
  indentDropdown: 'true',
  widgets: [
    {
      id: 'table-title-widget1',
      type: 'label',
      presentation: { show: true, text: 'Agent State' },
      sizeX: 34,
      sizeY: 1,
      col: 3,
      row: 0,
    },
    {
      id: 'resourceStateList',
      type: 'table',
      query: {
        api: 'realtime-statistics',
        endpoint: 'resource-state-list',
        responseKey: 'json',
        parameters: {},
        middleware: [
          'addAgents',
          'addGroups',
          'addSkills',
          'addReasons',
          'formatTimeCells',
          'mapStateNames',
          'mapInteractionStateNames',
          'mapDirectionNames',
          'formatRateCells',
        ],
      },
      presentation: {
        tableConfig: {
          fields: [
            {
              header: {
                display: 'Agent',
                valuePath: 'id',
                displayPath: 'name',
              },
              lookup: 'agentId',
              name: 'agentName',
            },
            {
              header: {
                display: 'Groups',
                valuePath: 'id',
                displayPath: 'name',
              },
              lookup: 'groups:id',
              name: 'groups',
              id: 'user-groups-table2-column',
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
              id: 'user-skills-table2-column',
              sortOn: 'skills.length',
              filterOrderBy: 'name',
            },
            {
              header: {
                display: 'Presence State',
                valuePath: 'name',
                displayPath: 'name',
                options: [
                  { name: 'Away' },
                  { name: 'Busy' },
                  { name: 'Idle' },
                  { name: 'Offline' },
                ],
              },
              name: 'currentState',
            },
            {
              header: { display: 'Time in Presence State' },
              name: 'currentStateDuration',
              format: 'time',
            },
            {
              header: {
                display: 'Reason Code',
                valuePath: 'name',
                displayPath: 'name',
              },
              name: 'agentReasonName',
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
            {
              header: { display: 'Offered' },
              name: 'offeredWorkOffers',
              checked: false,
            },
            {
              header: { display: 'Accepted' },
              name: 'acceptedWorkOffers',
              checked: false,
            },
            {
              header: { display: 'Rejected' },
              name: 'rejectedWorkOffers',
              checked: false,
            },
            {
              header: { display: 'Accepted Rate' },
              name: 'acceptedWorkOffersRate',
              format: 'ratio',
              checked: false,
            },
            {
              header: { display: 'Away Time' },
              name: 'awayTime',
              format: 'time',
              checked: false,
            },
            {
              header: { display: 'Away Rate' },
              name: 'awayRate',
              format: 'ratio',
              checked: false,
            },
          ],
          searchOn: ['interactionId'],
          preferenceKey: 'resourceStateList',
          freezeState: true,
          orderBy: 'interactionId',
          title: 'Agent State',
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
