import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryProvider } from './providers/queryProvider';
import { AppThemeProvider } from './providers/appThemeProvider';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const getSession = async () => await new Promise((resolve, reject) => {
  console.time('LoadWFM');
  const eventHandler = (event: any) => {
    if (event.data.error) {
      reject(event.data.error);
      window.removeEventListener('message', eventHandler, false);
    };
    if (event.data?.response?.tenant?.tenantId) {
      localStorage.setItem('token', event.data.response.token);
      localStorage.setItem('baseUrl', event.data.response.baseUrl);
      resolve(event.data.response);
      window.removeEventListener('message', eventHandler, false);
    }
  }

  if (window.parent !== window) {
    window.parent.postMessage(
      { module: 'updateLocalStorage' }, '*'
    );
    window.addEventListener('message', eventHandler, false);
  }

})
.then( (data: any) => {

  console.timeEnd('LoadWFM')

  ReactDOM.render(
    <React.StrictMode>
      <HashRouter>
        <Provider store={store}>
          <QueryProvider>
            <AppThemeProvider>
                <App tenant_id={data.tenant?.tenantId} />
            </AppThemeProvider>
          </QueryProvider>
        </Provider>
      </HashRouter>
    </React.StrictMode>,
    document.getElementById('root'),
  );

});

getSession();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
