interface DashboardMap {
  dashboards: {
    [key: string]: any;
  };
  refreshRate: number;
}
export const realtimeDashboardsSettings: DashboardMap = {
  dashboards: {
    // 'agent-details-dashboard': dashboardAgentDetails,
    // 'agent-state-dashboard': dashboardAgentState,
    // 'interactions-dashboard': dashboardInteractions,
    // 'interactions-completed-dashboard': dashboardInteractionsCompleted,
    // 'interactions-in-conversation-dashboard': dashboardInteractionsInConversation,
    // 'interactions-in-queue-dashboard': dashboardInteractionsInQueue,
    // 'interactions-in-routing-dashboard': dashboardInteractionsInRouting,
    // 'overview-dashboard': dashboardOverview,
    // 'queue-details-dashboard': dashboardQueueDetails,
    // 'queues-dashboard': dashboardQueues,
    // 'resources-dashboard': dashboardResources,
  },
  refreshRate: 10000,
};
