import React, { PropTypes, Component }  from 'react';
import { connect }                      from 'react-redux';
import { browserHistory }               from 'react-router';
import { signOut }                      from 'redux-oauth';

@connect()
export default class extends Component {
  static propTypes = {
    dispatch:   PropTypes.func
  };

  state = { seconds: 5 };

  componentDidMount() {
    this.interval = setInterval(
      () => {
        this.setState(
          { seconds: this.state.seconds - 1},
          () => {
            if (this.state.seconds === 0) {
              clearInterval(this.interval);
              this.props.dispatch(signOut());
              browserHistory.push('/');
            }
          }
        )
      },
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { seconds }   = this.state;
    const secondsWidget = <span>{seconds} second{seconds !== 1 ? 's' : null}</span>;

    return (
      <div>
        <p>Javascript failed to initialize / load, therefore we are failing back to this page.</p>
        <p>After page is ready we will redirect home in {secondsWidget}</p>
      </div>
    );
  }
}
