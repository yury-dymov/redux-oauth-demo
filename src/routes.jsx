import React                  from 'react';
import { Route, IndexRoute }  from 'react-router';

import App                    from 'views/App';
import Home                   from 'views/Home';
import Signout                from 'views/Signout';
import Client                 from 'views/Client';
import Server                 from 'views/Server';

let store;

function requireAuth(nextState, transition, cb) {
  setTimeout(() => {
    if (!store.getState().auth.getIn(['user', 'isSignedIn'])) {
      transition('/');
    }

    cb();
  }, 0);
}

export default function routes(str) {
  store = str;

  return (
    <Route component={App} path='/'>
      <IndexRoute component={Home} />
      <Route component={Signout} path='/sign-out' />
      <Route component={Client} path='/client' onEnter={requireAuth} />
      <Route component={Server} path='/server' onEnter={requireAuth} />
    </Route>
  );
}
