import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryProvider } from './providers/queryProvider';
import { AppThemeProvider } from './providers/appThemeProvider';

import styled from 'styled-components';
const ColorButton = styled.button<{ isActive: boolean; }>`

color: ${props => ( props.isActive ? 'green' : 'red' )}

`;

function App() {
  const [ count, setCount ] = React.useState( 0 );

  React.useEffect( () => {
    document.title = `You clicked ${count} times`;
  } );

  return <div>
    <ColorButton isActive={ false } onClick={ () => setCount( count + 1 ) }> plus 1</ColorButton>
  </div>;
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
