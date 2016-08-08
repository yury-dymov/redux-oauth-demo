import React, { Component, PropTypes }  from 'react';
import { asyncConnect }                 from 'redux-connect';

import { apiRequest }                   from 'redux/actions/test';

@asyncConnect([
  {
    key: 'server',
    promise: ({ params, store }) => {
      if (typeof window !== 'undefined') {
        // do nothing if we are browser

        return null;
      }

      return store.dispatch(apiRequest());
    }
  }
], mapStateToProps)
export default class Server extends Component {
  static propTypes = {
    loading:  PropTypes.bool,
    loaded:   PropTypes.bool,
    time:     PropTypes.number,
    errors:   PropTypes.array,
    dispatch: PropTypes.func
  };

  componentDidMount() {
    const { loaded, dispatch } = this.props;

    if (!loaded) {
      dispatch(apiRequest());
    }
  }

  render() {
    const { time, errors, loading } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    let widget = null;

    if (time) {
      widget = <div>Server timestamp: {time}</div>
    }

    if (errors) {
      widget = <div>Errors: {errors.map((err, idx) => <span key={idx}>{err}</span>)}</div>
    }

    return (
      <div>
        <h2>Secured API Request</h2>
        <p>
          This view is rendered on the server side. Refresh the page to check that no 'Loading...' is initially rendered and no requests are taking place from the client side.
          Then navigation to this view occurs on client side, than client makes request as usual.
        </p>
        <p>
          Note: after data of this view is loaded either server-side or client-side, no further requests are performed
        </p>
        {widget}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const loading   = state.test.getIn([ 'loading' ]);
  const time      = state.test.getIn([ 'time' ]);
  const errorMap  = state.test.getIn([ 'errors' ]);
  const loaded    = state.reduxAsyncConnect.loadState.server && state.reduxAsyncConnect.loadState.server.loaded;

  let errors = null;

  if (errorMap) {
    errors = [];
    errorMap.forEach(err => errors.push(err));
  }

  return { loading, time, errors, loaded };
}
