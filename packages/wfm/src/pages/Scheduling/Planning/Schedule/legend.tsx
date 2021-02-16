import * as React from 'react';
import styled from 'styled-components';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

const Label = styled.span`
  font-size: 11px;
  color: grey;
  margin-left: 30px;
  vertical-align: super;
`;

export const Legend: React.FC<any> = () => (
  <span>
    <Label>Competence</Label>
    {' '}
    <CheckRoundedIcon style={{ color: 'rgb(69 107 46)' }} />
    <Label>Conflict</Label>
    {' '}
    <WarningRoundedIcon style={{ color: '#f17100' }} />
  </span>
);
