import { Paper } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled(Paper)`
  width: 100%;
  height: 100%;
`;

export const Card = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'main'
    'footer';
`;
export const CardHeader = styled.div`
  grid-area: header;
`;
export const CardContent = styled.div`
  grid-area: main;
  align-self: center;
  justify-self: center;
`;
export const CardFooter = styled.div`
  grid-area: footer;
`;
