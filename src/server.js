import express                                                from 'express';
import cookieParser                                           from 'cookie-parser';
import compression                                            from 'compression';

import React                                                  from 'react';
import ReactDOM                                               from 'react-dom/server';
import { Provider }                                           from 'react-redux';
import { match }                                              from 'react-router';

import routes                                                 from './routes.jsx';
import configureStore                                         from './redux/configureStore';

import { ReduxAsyncConnect, loadOnServer }                    from 'redux-connect';

import { getHeaders, initialize }                             from 'redux-oauth';

import now                                                    from 'lodash/now';

const app = express();

const assetUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:7050'

app.use('/public', express.static('public'));
app.use(cookieParser());
app.use(compression());

app.use((req, res) => {
  const store             = configureStore();
  const reduxOauthConfig  = {
    backend: {
      apiUrl:       'https://redux-oauth-backend.herokuapp.com',
      signOutPath:  null,
      authProviderPaths: {
        github: '/auth/github'
      }
    },
    cookies: req.cookies,
    currentLocation: req.url
  };

  store.dispatch(initialize(reduxOauthConfig))
    .then(() => match({ routes: routes(store), location: req.url }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        res.status(500).send(error.message);
      } else if (!renderProps) {
        res.status(404).send('Not found');
      } else {
        loadOnServer({ ...renderProps, store })
          .then(() => {
            const componentHTML = ReactDOM.renderToString(
              <Provider store={store}>
                <ReduxAsyncConnect {...renderProps}/>
              </Provider>
            );

            const initialState = store.getState();

            return renderHTML({
              componentHTML,
              initialState
            });
          })
            .then(html => {
              // !!! IMPORTANT TO PERSIST SESSION IF JavaScript failed to load / initialize
              res.cookie('authHeaders', JSON.stringify(getHeaders(store.getState())), { maxAge: now() * 0.001 + 14 * 24 * 3600 });

              res.end(html);
          })
            .catch(err => {
              console.log(err.stack);
              res.end(err.message);
            });
      }
  }));
});



function renderHTML({ componentHTML, initialState }) {
  return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Redux OAuth Demo</title>
          <link rel='stylesheet' href='${assetUrl}/public/bundle.css' type='text/css' />
      </head>
      <body>
        <script type="application/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <div id="react-view">${componentHTML}</div>
        <div id="redux-dev-tools"></div>
        <script type="application/javascript" src="${assetUrl}/public/bundle.js"></script>
      </body>
    </html>
  `;
}

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
