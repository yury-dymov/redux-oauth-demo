import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk                                                      from 'redux-thunk';

import { authStateReducer as auth }                               from 'redux-oauth';
import { routerReducer as routing }                               from 'react-router-redux';
import { reducer as reduxAsyncConnect }                           from 'redux-connect';

import DevTools                                                   from 'components/DevTools';
import test                                                       from './reducers/test';

export default function configureStore(initialState = {}) {
  return createStore(
    combineReducers({
      auth,
      test,
      routing,
      reduxAsyncConnect
    }),
    initialState,
    compose(
      applyMiddleware(thunk),
      DevTools.instrument()
    )
  );
}
