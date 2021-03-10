import * as React from 'react';
import styled from 'styled-components';

import { FormDataProvider, useFormState } from 'context/MultipleRowSelection';
import { Form } from './Form';
import { List } from './List';

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

export function Restrictions() {
  return (
    <FormDataProvider>
      <Container />
    </FormDataProvider>
  );
}
