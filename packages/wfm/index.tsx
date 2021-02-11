import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryProvider } from './providers/queryProvider';
import { AppThemeProvider } from './providers/appThemeProvider';
import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <QueryProvider>
          <AppThemeProvider>
            <App />
          </AppThemeProvider>
        </QueryProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('app'),
);
