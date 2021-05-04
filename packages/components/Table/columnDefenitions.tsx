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
const EditableCellHeader = styled.div`
  margin: 0 auto;
  border: none;
  background-color: #8ac6dd26;
  text-align: center;
`

export interface ColumnDefenition {
  [key: string]: ColumnInterface;
};

export const editableCell = ({ defaultValue, rowData }: any) => {
  const [value, setValue] = React.useState(defaultValue || '');
  const [adjustmentOperation, setAdjustmentOperation] = React.useState('');

  const handleInputChange = (e: any) => {
    setValue(e.target.value);
    if (e.target.value === '') {
      setAdjustmentOperation('delete');
    }
  };

  const handleOnBlurChange = (e: any) => {
    // TODO:
    // setAdjustment({
    //   adjustmentId: rowData.adjustmentId,
    //   timestamp: rowData.timestamp,
    //   value: e.target.value,
    //   adjustmentOperation: adjustmentOperation
    // });
  };

  // Check if there is a value, so we can update it instead of creating a new one or deleting it
  const handleOnClick = (e: any) => {
    if (e.target.value !== '') {
      setAdjustmentOperation('update');
    } else {
      setAdjustmentOperation('post');
    }
  };

  return (
    <StyledInput
      name="input"
      type="text"
      onChange={(e) => handleInputChange(e)}
      onClick={(e) => handleOnClick(e)}
      onBlur={(e) => handleOnBlurChange(e)}
      value={value}
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
      return value;
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

const columnDefenitions = {
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
  col8: {
    Header: 'Monday Jan 11',
    accessor: 'col0',
    minWidth: '80px',
    maxWidth: '200px',
  },
  col9: {
    Header: 'Forecasted Volume',
    accessor: 'col1',
    minWidth: '80px',
    maxWidth: '200px',
  },
  col10: {
    Header: 'Adjustment test',
    Cell: (tableProps: any) => editableCell(tableProps),
    accessor: 'col2',
    minWidth: '80px',
    maxWidth: '200px',
    columnBackground: '#8ac6dd26'
  },
  col11: {
    Header: 'Adjusted Volume',
    accessor: 'col3',
    minWidth: '80px',
    maxWidth: '200px',
  },
  col12: {
    Header: 'Forecasted AHT',
    accessor: 'col4',
    minWidth: '80px',
    maxWidth: '200px',
  },
  col13: {
    Header: 'Adjustment',
    Cell: (tableProps: any) => editableCell(tableProps),
    accessor: 'col5',
    minWidth: '80px',
    maxWidth: '200px',
    columnBackground: '#8ac6dd26'
  },
  col14: {
    Header: 'AHT ADJUSTMENT',
    accessor: 'col6',
    minWidth: '80px',
    maxWidth: '200px',
  },
  col15: {
    Header: 'Estimated Maximum Hours',
    accessor: 'col7',
    minWidth: '80px',
    maxWidth: '200px',
  },
  col16: {
    Header: (tableProps: any) => formatDateHeader(tableProps, 'timestamp'),
    Cell: formatDateValue,
    accessor: 'timestamp',
    minWidth: '80px',
    maxWidth: '200px',
  },
  col17: {
    Header: 'FORECASTED VOLUME',
    accessor: 'nco',
    minWidth: '80px',
    maxWidth: '200px',
  },
  col18: {
    Header: <EditableCellHeader>ADJUSTMENT</EditableCellHeader>,
    Cell: (tableProps: any) => editableCell(tableProps),
    accessor: 'adjustment2',
    minWidth: '80px',
    maxWidth: '200px',
  },
  col19: {
    Header: 'ADJUSTED VOLUME',
    minWidth: '80px',
    maxWidth: '200px',
  },
  col20: {
    Header: 'FORECASTED AHT',
    accessor: 'aht',
    minWidth: '80px',
    maxWidth: '200px',
  },
  col21: {
    Header: <EditableCellHeader>AHT ADJUSTMENT</EditableCellHeader>,
    Cell: (tableProps: any) => editableCell(tableProps),
    accessor: 'adjustment',
    minWidth: '80px',
    maxWidth: '200px',
  },
  col22: {
    Header: 'ADJUSTED AHT',
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