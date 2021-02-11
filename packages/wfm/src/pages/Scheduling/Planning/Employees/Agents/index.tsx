import * as React from 'react';
import styled from 'styled-components';

import { Form } from './Form';
import { List } from './List';
import { FormDataProvider, useFormState } from './context';

const FullWrapper = styled.div`
  display: grid;
  grid-auto-columns: 3fr 1fr;
  gap: 15px;
`;

function Container() {
  const {
    open: [open],
  }: any = useFormState();

  return (
    <FullWrapper>
      <List />
      {open && <Form />}
    </FullWrapper>
  );
}

export function Agents() {
  return (
    <FormDataProvider>
      <Container />
    </FormDataProvider>
  );
}
