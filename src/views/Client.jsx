import React, { Component, PropTypes }  from 'react';
import { connect }                      from 'react-redux';

import { apiRequest }                   from 'redux/actions/test';

@connect(mapStateToProps)
export default class Client extends Component {
  static propTypes = {
    loading:  PropTypes.bool,
    time:     PropTypes.number,
    errors:   PropTypes.array,
    dispatch: PropTypes.func
  };

  componentDidMount() {
    this.props.dispatch(apiRequest());
  }

  render() {
    const { loading, time, errors } = this.props;

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
          This view requests server time from backend. You can check the request is performed on cliend side. Just refresh the page and
          you will see that for some time 'Loading...' is rendered instead of this widget.
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

  let errors = null;

  if (errorMap) {
    errors = [];
    errorMap.forEach(err => errors.push(err));
  }

  return { loading, time, errors };
}
