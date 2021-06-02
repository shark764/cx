import * as React from 'react';
import styled from 'styled-components';
import { ColumnInterface, Cell, Column } from 'react-table';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import { DateTime } from 'luxon';

const StyledInput = styled.input`
  margin: 0 auto;
  border: none;
  background-color: #8ac6dd26;
  text-align: center;
`;

const CenteredText = styled.div`
  text-align: center;
  font-size: 11px;
`;
const CenteredNumber = styled.div`
  text-align: center;
`;
const CompetenceIcon = styled(CheckRoundedIcon) <{ value: boolean }>`
  display: ${({ value }) => (value ? 'inherit' : 'none !important')};
`;
const WarningIcon = styled(WarningRoundedIcon) <{ value: boolean }>`
  display: ${({ value }) => (value ? 'inherit' : 'none !important')};
`;

export interface ColumnDefenition {
  [key: string]: ColumnInterface;
};

export const EditableCell = ({ value, adjustmentCellMethod, rest }: any) => {

  const [inputValue, setInputValue] = React.useState(value);

  const handleInputChange = ({target: { value }}: any) => {
    setInputValue(value);

  };

  return (
    <StyledInput
      name="input"
      type="text"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onChange={(e) => handleInputChange(e)}
      value={inputValue}
    />
  );
};

const formatDateValue = ({ value, viewMode }: any) => {
  switch (viewMode) {
    case 'day':
      return DateTime.fromISO(value).toLocaleString( DateTime.TIME_SIMPLE );
    case 'twoDays':
      return DateTime.fromISO(value).toLocaleString({ hour: '2-digit', minute: '2-digit' });
    case 'week':
    case 'range':
      return `${DateTime.fromISO(value).toLocaleString({ weekday: 'long', }).toUpperCase()} ${DateTime.fromISO(value).toLocaleString({ day: '2-digit' })}`;
    default:
      return DateTime.fromISO(value).toLocaleString( DateTime.TIME_SIMPLE );
  }
};

const formatDateHeader = ({ data, viewMode } : any, columnName: string) => {
  if (data && data.length > 0 && viewMode) {
    // We need first and last timestamps to format strings like WEEK APR 23 - APR 25
    const timestamps = data && data.map((row: any) => row[columnName] && row[columnName].toUpperCase() || []);
    const { 0: firstDay, length, [length - 1]: lastDay } = timestamps;
    if (viewMode !== 'day') {
      return `${viewMode === 'week' ? 'WEEK' : ''} ${new Date(firstDay).toLocaleString("en-us", { month: "short" }).toUpperCase()}
      ${new Date(firstDay).getDate()} -
      ${new Date(lastDay).toLocaleString("en-us", { month: "short" }).toUpperCase()}
      ${new Date(lastDay).getDate()} `;
    } else {
      return `${DateTime.fromISO(timestamps[0]).toLocaleString({ weekday: 'long', }).toUpperCase()} ${DateTime.fromISO(timestamps[0]).toLocaleString({ day: '2-digit' })}`;
    }
  } else {
    return 'DATE';
  }
};

const columnDefenitions: {[key: string]: any} = {
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
    Cell: function centeredNumber({ value }: Cell): JSX.Element { return <CenteredNumber>{value}</CenteredNumber> },
    accessor: 'col3',
    minWidth: '60px',
    maxWidth: '60px',
  },
  col4: {
    Cell: function centeredNumber({ value }: Cell): JSX.Element { return <CenteredNumber>{value}</CenteredNumber> },
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
    Cell: function centeredNumber({ value }: Cell): JSX.Element { return <CompetenceIcon value={value} style={{ color: 'rgb(69 107 46)' }} /> },
    accessor: 'col6',
    minWidth: '40px',
    maxWidth: '40px',
  },
  col7: {
    Header: '',
    Cell: function centeredNumber({ value }: Cell): JSX.Element { return <WarningIcon value={value} style={{ color: '#f17100' }} /> },
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
    Cell: function editableCell({ value, adjustmentCellMethod, ...rest }: any): JSX.Element {
      return (
      <EditableCell
        value={value}
        adjustmentCellMethod={adjustmentCellMethod}
        rest={rest}
      />) },
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
    Cell: function editableCell({ value, adjustmentCellMethod, ...rest }: any): JSX.Element {
      return (
      <EditableCell
        value={value}
        adjustmentCellMethod={adjustmentCellMethod}
        rest={rest}
      />) },
    accessor: 'adjustedAht',
    minWidth: '80px',
    maxWidth: '200px',
  },
  speculatedAht: {
    Header: 'Adjusted Aht',
    accessor: 'speculatedAht',
    minWidth: '80px',
    maxWidth: '200px',
  }
};

const getColumn = (columnName: string) => columnDefenitions[columnName];

export const defineColumns = (chosenColumns: string[]): Column[] =>
  [...chosenColumns.map((columnName) => getColumn(columnName))];

export const defineGridTemplateColumns = (chosenColumns: string[]): string =>
  chosenColumns.reduce((finalTemplate, currentColumnName) =>
    finalTemplate += `minmax(${columnDefenitions[currentColumnName].minWidth}, ${columnDefenitions[currentColumnName].maxWidth})`, '');