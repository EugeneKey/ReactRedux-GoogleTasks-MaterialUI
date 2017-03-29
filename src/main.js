import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import SessionActions from './actions/SessionActions';
import configureStore from './store';
import AllRouter from './routes';
import { useBasename } from 'history';

const historyWithPatch = useBasename(() => browserHistory)({ basename: process.env.BASE_URL });

const store = configureStore();
const {getState} = store;
const history = syncHistoryWithStore(historyWithPatch, store);

window.handleClientLoad = () => {
  store.dispatch( SessionActions.loadClient(renderApp) );
};

function renderApp() {
  ReactDOM.render(
        <Provider store={ store }>
            <AllRouter history={ history } getState={ getState } />
        </Provider>,
        document.getElementById('mount-point')
    );
}
