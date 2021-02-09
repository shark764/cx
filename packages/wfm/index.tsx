import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryProvider } from './providers/queryProvider';
import { AppThemeProvider } from './providers/appThemeProvider';
import { Navigation } from './navigation';
import styled from 'styled-components';

// import styled from 'styled-components';
// const ColorButton = styled.button<{ isActive: boolean; }>`
// color: white;
// background: ${props => props.theme.colors.brand }

// `;

/* function App() {
  const [ count, setCount ] = React.useState( 0 );

  React.useEffect( () => {
    document.title = `You clicked ${count} times`;
  } );

  return <div>
    <ColorButton isActive={ false } onClick={ () => setCount( count + 1 ) }> plus 1</ColorButton>
  </div>;
} */




/* import PageHeader from './navigation/PageHeader';
import SideBar from './components/SideBar';
import PageSideBar from './navigation/PageSideBar'; */

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
      {/* <SideBar>
        <PageSideBar />
      </SideBar>

      <PageHeader /> */}

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
