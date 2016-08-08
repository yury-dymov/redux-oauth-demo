import React, { Component, PropTypes }  from 'react';

import AppBar                           from 'components/AppBar';

import { connect }                      from 'react-redux';
import { browserHistory }               from 'react-router';

import { signOut }                      from 'redux-oauth';

@connect(mapStateToProps, null, null, { pure: false })
export default class extends Component {
  static propTypes = {
    isSignedIn:           PropTypes.bool,
    dispatch:             PropTypes.func
  };

  state = {
    expanded: false
  };

  handleLogout = () => {
    this.props.dispatch(signOut());
    browserHistory.push('/');
    this.handleMenuToggle(false);
  };

  handleMenuToggle = (value) => {
    const expanded = typeof value === 'undefined' ? !this.state.expanded : value;

    this.setState({ expanded });
  };

  render() {
    const { ...restProps } = this.props;

    return (
      <AppBar
        onLogout     = {this.handleLogout}
        onMenuToggle = {this.handleMenuToggle}
        expanded     = {this.state.expanded}
        {...restProps}
      />
    );
  }
}

function mapStateToProps(state) {
  return { isSignedIn: !!state.auth.getIn(['user', 'isSignedIn']) };
}

