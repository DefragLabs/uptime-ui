import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import store, { history } from './store/store';
import AppRoutes from './routes/routes';
import registerServiceWorker from './registerServiceWorker';

import './styles/index.css';
import 'semantic-ui-css/semantic.min.css';

const target = document.querySelector('#root');

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppRoutes />
      </ConnectedRouter>
    </Provider>
  </I18nextProvider>, target
);

registerServiceWorker();