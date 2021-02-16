import * as React from 'react';
import styled from 'styled-components';

import { Form } from './Form';
import { List } from './List';
import { DataProvider } from './context';

const Container = styled.div`
  display: grid;
  grid-auto-columns: 3fr 1fr;
  gap: 15px;
`;

export function Agents() {
  return (
    <DataProvider>
      <Container>
        <List />
        <Form />
      </Container>
    </DataProvider>
  );
}
