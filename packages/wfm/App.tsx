import * as React from 'react';
import styled from 'styled-components';
import { SideBar } from '@cx/components/SideBar';
import { PageSideBar } from '@cx/components/PageSideBar';
import { PageHeader } from '@cx/components/PageHeader';
import { Navigation } from './navigation';

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
