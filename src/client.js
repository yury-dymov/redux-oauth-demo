import { fetch }                            from 'redux-oauth';

import React                                from 'react';
import ReactDOM                             from 'react-dom';

import { Provider }                         from 'react-redux';
import { Router, browserHistory, match }    from 'react-router';
import { syncHistoryWithStore }             from 'react-router-redux';
import { ReduxAsyncConnect }                from 'redux-connect';
import configureStore                       from 'redux/configureStore';

import routes                               from 'routes';

const initialState  = window.__INITIAL_STATE__ || {};
const store         = configureStore(initialState);
const history       = syncHistoryWithStore(browserHistory, store);


function asyncRender(props) {
  return <ReduxAsyncConnect {...props} />;
}

match(
  { history, routes: routes(store) },
  (error, redirectLocation, renderProps) => ReactDOM.render (
    <Provider store={store}>
      <Router {...renderProps} render={asyncRender} />
    </Provider>,
    document.getElementById('react-view')
  )
);
