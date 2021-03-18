import * as React from 'react';
import styled from 'styled-components';
import { ColumnInterface, Cell, Column } from 'react-table';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';


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

export interface ColumnDefenition {
  [key: string]: ColumnInterface;
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
    Cell: function centeredNumber ({ value }: Cell): JSX.Element  { return <CenteredNumber>{value}</CenteredNumber> },
    accessor: 'col3',
    minWidth: '60px',
    maxWidth: '60px',
  },
  col4: {
    Cell: function centeredNumber ({ value }: Cell): JSX.Element { return <CenteredNumber>{value}</CenteredNumber> },
    accessor: 'col4',
    minWidth: '60px',
    maxWidth: '60px',
  },
  col5: {
    Header: 'Timezone', accessor: 'col5',
    minWidth: 'auto',
    maxWidth: '200px',
  },
  col6: {
    Header: '',
    Cell: function centeredNumber ({ value }: Cell): JSX.Element { return <CompetenceIcon value={value} style={{ color: 'rgb(69 107 46)' }} /> },
    accessor: 'col6',
    minWidth: '40px',
    maxWidth: '40px',
  },
  col7: {
    Header: '',
    Cell: function centeredNumber ({ value }: Cell): JSX.Element { return <WarningIcon value={value} style={{ color: '#f17100' }} /> },
    accessor: 'col7',
    minWidth: '40px',
    maxWidth: '40px',
  },
};

const getColumn = (columnName: string) => columnDefenitions[columnName];

export const defineColumns = (chosenColumns: string[]): Column[] =>
  [...chosenColumns.map((columnName) => getColumn(columnName) )];

export const defineGridTemplateColumns = (chosenColumns: string[]): string =>
  chosenColumns.reduce((finalTemplate, currentColumnName ) => finalTemplate += `minmax(${columnDefenitions[currentColumnName].minWidth},${columnDefenitions[currentColumnName].maxWidth})`, '');