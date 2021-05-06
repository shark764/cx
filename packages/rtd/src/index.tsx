import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './assets/styles.css';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { QueryProvider } from './providers/queryProvider';
import { AppThemeProvider } from './providers/appThemeProvider';
import { store } from './redux/store';

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
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
