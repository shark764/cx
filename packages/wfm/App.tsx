import * as React from 'react';
import styled from 'styled-components';
import { Navigation } from './navigation';
import { SideBar } from '../components/SideBar';
import { PageSideBar } from '../components/PageSideBar';
import { PageHeader } from '../components/PageHeader';

const Main = styled.main`
  margin: 0;
  overflow: auto;
`;

const Content = styled.section`
  padding: 24px;
  margin-left: 200px;
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
