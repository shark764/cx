import * as React from 'react';
import styled from 'styled-components';

const Group = styled.div`
  margin-bottom: 25px;
`;
const Fields = styled.div`
  margin-left: 15px;
`;

interface IHeaderGroup {
  title: string;
  children: React.ReactNode;
}
export function HeaderGroup({ title, children }: IHeaderGroup) {
  return (
    <Group>
      <h5>{title}</h5>

      <Fields>{children}</Fields>
    </Group>
  );
}
