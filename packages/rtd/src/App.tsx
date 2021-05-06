import * as React from 'react';
import styled from 'styled-components';
import { inIframe } from '@cx/utilities';
import { Navigation } from './navigation/Navigation';
import { Header } from './components/Header';
import { PageHeader } from './components/PageHeader';

const Head = styled.header``;

const Main = styled.main`
  margin: 0;
  overflow: auto;
`;

const Content = styled.section`
  padding: 24px;
  /* margin-left: 100px; */
`;

export function App() {
  return (
    <>
      {/* Not in iframe */}
      {!inIframe() && <PageHeader />}

      <Head>
        <Header />
      </Head>

      <Main>
        <Content>
          <Navigation />
        </Content>
      </Main>
    </>
  );
}
