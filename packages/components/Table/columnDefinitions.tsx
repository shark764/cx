import * as React from 'react';
import styled from 'styled-components';
import { ColumnInterface, Cell, Column } from 'react-table';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import { DateTime } from 'luxon';
import { getStatisticFormat } from '@cx/utilities/statistic';
import { SelectColumnFilter } from './filters';

const CenteredText = styled.div`
  text-align: center;
  font-size: 11px;
`;
const CenteredNumber = styled.div`
  text-align: center;
`;
const CompetenceIcon = styled(CheckRoundedIcon)<{ value: boolean }>`
  display: ${({ value }) => (value ? 'inherit' : 'none !important')};
`;
const WarningIcon = styled(WarningRoundedIcon)<{ value: boolean }>`
  display: ${({ value }) => (value ? 'inherit' : 'none !important')};
`;

const ConditionalNumber = styled.span<{ value: number }>`
  display: ${({ value }) => (value ? 'inline-block' : 'none !important')};
  width: 100%;
  height: 100%;
`;

export interface ColumnDefenition {
  [key: string]: ColumnInterface;
}

const formatDateValue = ({ value, viewMode }: any) => {
  switch (viewMode) {
    case 'quarter-hour':
      return DateTime.fromISO(value).toLocaleString(DateTime.TIME_SIMPLE);
    case 'hour':
      return DateTime.fromISO(value).toLocaleString({ month:'short', day: 'numeric', ...DateTime.TIME_SIMPLE});
    default:
      return DateTime.fromISO(value).toLocaleString(DateTime.DATE_SHORT);
  }
};

const formatDateHeader = ({ data, viewMode }: any, columnName: string) => {
  if (data && data.length > 0 && viewMode) {
    // We need first and last timestamps to format strings like WEEK APR 23 - APR 25
    const timestamps = data
      && data.map(
        (row: any) => (row[columnName] && row[columnName].toUpperCase()) || [],
      );
    const { 0: firstDay, length, [length - 1]: lastDay } = timestamps;
    if (viewMode !== 'day') {
      return `${viewMode === 'week' ? 'WEEK' : ''} ${new Date(firstDay)
        .toLocaleString('en-us', { month: 'short' })
        .toUpperCase()}
      ${new Date(firstDay).getDate()} -
      ${new Date(lastDay)
    .toLocaleString('en-us', { month: 'short' })
    .toUpperCase()}
      ${new Date(lastDay).getDate()} `;
    }
    return `${DateTime.fromISO(timestamps[0])
      .toLocaleString({ weekday: 'long' })
      .toUpperCase()} ${DateTime.fromISO(timestamps[0]).toLocaleString({
      day: '2-digit',
    })}`;
  }
  return 'DATE';
};

function ratioFormatCell({ value }: Cell): JSX.Element {
  return <span>{getStatisticFormat(value, 'ratio', 'table')}</span>;
}
function timeFormatCell({ value }: Cell): JSX.Element {
  return <span>{getStatisticFormat(value, 'time', 'table')}</span>;
}
function timestampFormatCell({ value }: Cell): JSX.Element {
  return <span>{getStatisticFormat(value, 'timestamp', 'table')}</span>;
}

const columnDefinitions: { [key: string]: any } = {
  checkbox: {
    id: 'selection',
    disableResizing: true,
    minWidth: '40px',
    maxWidth: '40px',
  },
  col1: {
    Header: 'Agent',
    accessor: 'col1',
    minWidth: '160px',
    maxWidth: '200px',
  },
  col2: {
    Header: 'Team',
    accessor: 'col2',
    minWidth: '80px',
    maxWidth: '130px',
  },
  col3: {
    Header: <CenteredText>Agreed Hours</CenteredText>,
    Cell: function centeredNumber({ value }: Cell): JSX.Element {
      return <CenteredNumber>{value}</CenteredNumber>;
    },
    accessor: 'col3',
    minWidth: '60px',
    maxWidth: '60px',
  },
  col4: {
    Cell: function centeredNumber({ value }: Cell): JSX.Element {
      return <CenteredNumber>{value}</CenteredNumber>;
    },
    accessor: 'col4',
    minWidth: '60px',
    maxWidth: '60px',
  },
  col5: {
    Header: 'Timezone',
    accessor: 'col5',
    minWidth: 'auto',
    maxWidth: '200px',
  },
  col6: {
    Header: '',
    Cell: function centeredNumber({ value }: Cell): JSX.Element {
      return (
        <CompetenceIcon value={value} style={{ color: 'rgb(69 107 46)' }} />
      );
    },
    accessor: 'col6',
    minWidth: '40px',
    maxWidth: '40px',
  },
  col7: {
    Header: '',
    Cell: function centeredNumber({ value }: Cell): JSX.Element {
      return <WarningIcon value={value} style={{ color: '#f17100' }} />;
    },
    accessor: 'col7',
    minWidth: '40px',
    maxWidth: '40px',
  },

  timestamp: {
    Header: (tableProps: any) => formatDateHeader(tableProps, 'timestamp'),
    Cell: formatDateValue,
    accessor: 'timestamp',
    minWidth: '80px',
    maxWidth: '200px',
  },
  nco: {
    Header: 'Forecasted NCO',
    accessor: 'nco',
    minWidth: '80px',
    maxWidth: '200px',
  },
  adjustedNco: {
    Header: 'NCO Adjustment',
    Cell: function conditionalNumber({ value }: Cell): JSX.Element {
      return <ConditionalNumber value={value}>{value}</ConditionalNumber>;
    },
    columnBackground: '#adadad12',
    accessor: 'adjustedNco',
    minWidth: '80px',
    maxWidth: '200px',
  },
  speculatedNco: {
    Header: 'Adjusted Volumne',
    accessor: 'speculatedNco',
    minWidth: '80px',
    maxWidth: '200px',
  },
  aht: {
    Header: 'Forecasted AHT',
    accessor: 'aht',
    minWidth: '80px',
    maxWidth: '200px',
  },
  adjustedAht: {
    Header: 'AHT Adjustment',
    Cell: function conditionalNumber({ value }: Cell): JSX.Element {
      return <ConditionalNumber value={value}>{value}</ConditionalNumber>;
    },
    columnBackground: '#adadad12',
    accessor: 'adjustedAht',
    minWidth: '80px',
    maxWidth: '200px',
  },
  speculatedAht: {
    Header: 'Adjusted Aht',
    accessor: 'speculatedAht',
    minWidth: '80px',
    maxWidth: '200px',
  },
  agentName: {
    Header: 'Agent',
    accessor: 'agentName',
    minWidth: 'auto',
    maxWidth: '200px',
  },
  groups: {
    Header: 'Groups',
    accessor: 'groups',
    Cell: function DisplayCell({ value }: Cell): JSX.Element {
      return (
        <span>
          {value
            .map(
              (group: { groupId: string; groupName: string }) => group.groupName,
            )
            .join(', ')}
        </span>
      );
    },
    minWidth: 'auto',
    maxWidth: '200px',
  },
  skills: {
    Header: 'Skills',
    accessor: 'skills',
    Cell: function DisplayCell({ value }: Cell): JSX.Element {
      return (
        <span>
          {value
            .map(
              (skill: { skillId: string; skillName: string }) => skill.skillName,
            )
            .join(', ')}
        </span>
      );
    },
    minWidth: 'auto',
    maxWidth: '200px',
  },
  currentState: {
    Header: 'Presence State',
    accessor: 'currentState',
    minWidth: 'auto',
    maxWidth: '100px',
  },
  currentStateDuration: {
    Header: 'Time in Presence State',
    accessor: 'currentStateDuration',
    Cell: timeFormatCell,
    minWidth: 'auto',
    maxWidth: '100px',
  },
  agentReasonName: {
    Header: 'Reason Code',
    accessor: 'agentReasonName',
    minWidth: 'auto',
    maxWidth: '100px',
  },
  direction: {
    Header: 'Direction',
    accessor: 'direction',
    minWidth: 'auto',
    maxWidth: '100px',
  },
  offeredWorkOffers: {
    Header: 'Offered',
    accessor: 'offeredWorkOffers',
    minWidth: 'auto',
    maxWidth: '100px',
  },
  acceptedWorkOffers: {
    Header: 'Accepted',
    accessor: 'acceptedWorkOffers',
    minWidth: 'auto',
    maxWidth: '100px',
  },
  rejectedWorkOffers: {
    Header: 'Rejected',
    accessor: 'rejectedWorkOffers',
    minWidth: 'auto',
    maxWidth: '100px',
  },
  acceptedWorkOffersRate: {
    Header: 'Accepted Rate',
    accessor: 'acceptedWorkOffersRate',
    Cell: ratioFormatCell,
    minWidth: 'auto',
    maxWidth: '100px',
  },
  awayTime: {
    Header: 'Away Time',
    accessor: 'awayTime',
    Cell: timeFormatCell,
    minWidth: 'auto',
    maxWidth: '100px',
  },
  awayRate: {
    Header: 'Away Rate',
    accessor: 'awayRate',
    Cell: ratioFormatCell,
    minWidth: 'auto',
    maxWidth: '100px',
  },
  conversationStarts: {
    Header: 'Conversation Starts',
    accessor: 'conversationStarts',
    minWidth: 'auto',
    maxWidth: '100px',
  },
  avgResourceTalkTime: {
    Header: 'Avg Talk Time',
    accessor: 'avgResourceTalkTime',
    Cell: timeFormatCell,
    minWidth: 'auto',
    maxWidth: '100px',
  },
  avgResourceHoldDuration: {
    Header: 'Avg Hold Time',
    accessor: 'avgResourceHoldDuration',
    Cell: timeFormatCell,
    minWidth: 'auto',
    maxWidth: '100px',
  },
  avgResourceWrapUpDuration: {
    Header: 'Avg Wrap-up Time',
    accessor: 'avgResourceWrapUpDuration',
    Cell: timeFormatCell,
    minWidth: 'auto',
    maxWidth: '100px',
  },
  avgTimeToAnswer: {
    Header: 'Avg Time to Answer',
    accessor: 'avgTimeToAnswer',
    Cell: timeFormatCell,
    minWidth: 'auto',
    maxWidth: '100px',
  },
  avgHandleTime: {
    Header: 'Avg Handle Time',
    accessor: 'avgHandleTime',
    Cell: timeFormatCell,
    minWidth: 'auto',
    maxWidth: '100px',
  },
  avgResourceLoggedInTime: {
    Header: 'Avg Logged in Time',
    accessor: 'avgResourceLoggedInTime',
    Cell: timeFormatCell,
    minWidth: 'auto',
    maxWidth: '100px',
  },
  queueName: {
    Header: 'Queue',
    accessor: 'queueName',
    minWidth: '200px',
    maxWidth: '400px',
    disableFilters: false,
    Filter: SelectColumnFilter,
    filter: 'includes',
  },
  serviceLevel: {
    Header: 'Queue Service Level',
    accessor: 'serviceLevel',
    minWidth: '200px',
    maxWidth: '400px',
  },
  abandonCount: {
    Header: 'Queue Abandons',
    accessor: 'abandonCount',
    minWidth: '200px',
    maxWidth: '400px',
  },
  queueLength: {
    Header: 'Queue Length',
    accessor: 'queueLength',
    minWidth: '200px',
    maxWidth: '400px',
  },
  avgQueueDuration: {
    Header: 'Avg Queue Time',
    accessor: 'avgQueueDuration',
    Cell: timeFormatCell,
    minWidth: '200px',
    maxWidth: '400px',
  },
  interactionId: {
    Header: 'Interaction ID',
    accessor: 'interactionId',
    minWidth: 'auto',
    maxWidth: '200px',
  },
  flowName: {
    Header: 'Flow',
    accessor: 'flowName',
    minWidth: 'auto',
    maxWidth: '200px',
  },
  channelType: {
    Header: 'Channel',
    accessor: 'channelType',
    minWidth: 'auto',
    maxWidth: '80px',
  },
  customer: {
    Header: 'Customer ID',
    accessor: 'customer',
    minWidth: 'auto',
    maxWidth: '200px',
  },
  contactPoint: {
    Header: 'Contact Point',
    accessor: 'contactPoint',
    minWidth: 'auto',
    maxWidth: '200px',
  },
  startTimestamp: {
    Header: 'Start Time',
    accessor: 'startTimestamp',
    Cell: timestampFormatCell,
    minWidth: '100px',
    maxWidth: '100px',
  },
  agents: {
    Header: 'Agent(s)',
    accessor: 'agents',
    Cell: function DisplayCell({ value }: Cell): JSX.Element {
      return (
        <span>
          {value
            .map(
              (agent: { agentId: string; agentName: string }) => agent.agentName,
            )
            .join(', ')}
        </span>
      );
    },
    minWidth: '100px',
    maxWidth: '200px',
  },
  interactionDuration: {
    Header: 'Duration',
    accessor: 'interactionDuration',
    Cell: timeFormatCell,
    minWidth: 'auto',
    maxWidth: '100px',
  },
  conversationStartTimestamp: {
    Header: 'In Conversation Time',
    accessor: 'conversationStartTimestamp',
    Cell: timestampFormatCell,
    minWidth: '100px',
    maxWidth: '100px',
  },
};

const getColumn = (columnName: string) => columnDefinitions[columnName];

export const defineColumns = (chosenColumns: string[]): Column[] => [
  ...chosenColumns.map((columnName) => getColumn(columnName)),
];

export const defineGridTemplateColumns = (chosenColumns: string[]): string => chosenColumns.reduce(
  (finalTemplate, currentColumnName) => `${finalTemplate}minmax(${columnDefinitions[currentColumnName].minWidth}, ${columnDefinitions[currentColumnName].maxWidth})`,
  '',
);
