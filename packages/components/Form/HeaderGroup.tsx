import * as React from 'react';
import styled from 'styled-components';
import { IHeaderGroup } from '@cx/types/form';

const Group = styled.div`
  margin-bottom: 25px;
`;
const Header = styled.h5`
  border-bottom: 1px solid hsl(0, 0%, 80%);
  line-height: 0.1em;
  margin: 2.5em 0;
  margin-right: 0.5rem;

  span {
    background: white;
    padding-right: 10px;
  }
`;
const Fields = styled.div`
  margin-left: 15px;
`;

export function HeaderGroup({ title, children }: IHeaderGroup) {
  return (
    <Group>
      <Header>
        <span>{title}</span>
      </Header>

      <Fields>{children}</Fields>
    </Group>
  );
}
