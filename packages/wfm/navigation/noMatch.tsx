import * as React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Box = styled.div`
  margin: auto;
  width: 50%;
  padding: 40px;
  text-align: center;
`;
const Location = styled.span`
  font-size: 28px;
  font-weight: bold;
  color: ${( props ) => props.theme.colors.secondary};
`;

export function NoMatch() {
  const location = useLocation();

  return (
    <Box>
      <h2>
        No match for
        { ' ' }
        <Location>{ location.pathname }</Location>
      </h2>
    </Box>
  );
}
