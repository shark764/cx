import { LinksMap } from '@cx/types';
import {
  DonutLarge,
  PermPhoneMsg,
  Person,
  Queue,
  RecordVoiceOver,
  VoiceOverOff,
} from '@material-ui/icons';

export const tempTenantId = 'b045f7b3-6f30-45ec-89aa-6f6ed2cf2040';

export const drawerWidth = 300;

export const standardDashboardLinks: LinksMap = {
  '/standard/overview-dashboard': {
    label: 'Overview Dashboard',
    to: '/standard/overview-dashboard',
    LinkIcon: DonutLarge,
  },
  '/standard/interactions-dashboard': {
    label: 'Interactions Dashboard',
    to: '/standard/interactions-dashboard',
    LinkIcon: PermPhoneMsg,
  },
  '/standard/queues-dashboard': {
    label: 'Queues Dashboard',
    to: '/standard/queues-dashboard',
    LinkIcon: Queue,
  },
  '/standard/resources-dashboard': {
    label: 'Resources Dashboard',
    to: '/standard/resources-dashboard',
    LinkIcon: Person,
  },
  '/standard/agent-details-dashboard': {
    label: 'Agent Details Table',
    to: '/standard/agent-details-dashboard',
    LinkIcon: RecordVoiceOver,
  },
  '/standard/agent-state-dashboard': {
    label: 'Agent State Table',
    to: '/standard/agent-state-dashboard',
    LinkIcon: VoiceOverOff,
  },
  '/standard/interactions-completed-dashboard': {
    label: 'Interactions Completed Table',
    to: '/standard/interactions-completed-dashboard',
    LinkIcon: PermPhoneMsg,
  },
  '/standard/interactions-in-conversation-dashboard': {
    label: 'Interactions In Conversation Table',
    to: '/standard/interactions-in-conversation-dashboard',
    LinkIcon: PermPhoneMsg,
  },
  '/standard/interactions-in-routing-dashboard': {
    label: 'Interactions In IVR Table',
    to: '/standard/interactions-in-routing-dashboard',
    LinkIcon: PermPhoneMsg,
  },
  '/standard/interactions-in-queue-dashboard': {
    label: 'Interactions In Queue Table',
    to: '/standard/interactions-in-queue-dashboard',
    LinkIcon: PermPhoneMsg,
  },
  '/standard/queue-details-dashboard': {
    label: 'Queue Details Table',
    to: '/standard/queue-details-dashboard',
    LinkIcon: Queue,
  },
};

export const channels = [
  { id: 'email', label: 'Email' },
  { id: 'messaging', label: 'Messaging' },
  { id: 'sms', label: 'SMS' },
  { id: 'voice', label: 'Voice' },
  { id: 'work-item', label: 'Work Item' },
];

export const directions = [
  { id: 'inbound', label: 'Inbound' },
  { id: 'outbound', label: 'Outbound' },
  { id: 'agent-initiated', label: 'Agent Initiated' },
];
