import { Paper, Theme, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const BoxWrapper = styled(Paper)`
  border: solid 1px rgba(128, 128, 128, 0.59);
  box-shadow: none;
  ${({ theme }: { theme: Theme }) => `
    color: ${theme.palette.text.secondary};
  `};
`;

export const BoxTitle = styled(Typography)`
  color: grey;
  font-style: italic;
  font-weight: bold;
  font-size: inherit;
  ${({ theme }: { theme: Theme }) => `
    margin-bottom: ${theme.spacing(1)};
  `};
`;
