import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryProvider } from './providers/queryProvider';
import { AppThemeProvider } from './providers/appThemeProvider';
import { Navigation } from './navigation';
import { PageHeader } from '../components/pageHeader';
import { SideBar } from '../components/sideBar';
import { PageSideBar } from '../components/pageSideBar';

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
      <SideBar>
        <PageSideBar />
      </SideBar>

      <PageHeader />

      <Main>
        <Content>
          <Navigation />
        </Content>
      </Main>
    </>
  );
}

ReactDOM.render(<React.StrictMode>
  <HashRouter>
    <Provider store={ store }>
      <QueryProvider>
        <AppThemeProvider>
          <App />
        </AppThemeProvider>
      </QueryProvider>
    </Provider>
  </HashRouter>
</React.StrictMode>, document.getElementById( "app" ) );
