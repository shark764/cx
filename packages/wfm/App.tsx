import * as React from 'react';
import styled from 'styled-components';
import { Navigation } from './navigation';
import { SideBar } from '@cx/components/SideBar';
import { PageSideBar } from '@cx/components/PageSideBar';
import { PageHeader } from '@cx/components/PageHeader';

const Main = styled.main`
  margin: 0;
  overflow: auto;
`;

const Content = styled.section`
  padding: 24px;
  margin-left: 100px;
`;

export function App() {
  return (
    <>
      <PageHeader />

      <PageSideBar />

      <Main>
        <Content>
          <Navigation />
        </Content>
      </Main>
    </>
  );
}
