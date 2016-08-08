import React, { Component, PropTypes }  from 'react';
import { connect }                      from 'react-redux';

@connect(mapStateToProps)
export default class UserInfoContainer extends Component {
  static propTypes = {
    signedIn: PropTypes.bool,
    provider: PropTypes.string,
    name:     PropTypes.string,
    uid:      PropTypes.string
  };

  render() {
    const { signedIn, name, uid, provider } = this.props;

    if (!signedIn) {
      return <div>Press 'Sign In' button to sign in and make menu available</div>;
    }

    return (
      <div style={{ marginTop: '20px' }}>
        <p>Now menu is available. You can check client-side option, server-side option or sign out.</p>
        <table className='table' style={{ maxWidth: '300px' }}>
          <thead>
            <tr>
              <td colSpan="2"><b>Account Details</b></td>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td>Name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Provider</td>
            <td>{provider}</td>
          </tr>
          <tr>
            <td>Uid</td>
            <td>{uid}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const signedIn = state.auth.getIn(['user', 'isSignedIn']) || false;

  if (signedIn) {
    const name      = state.auth.getIn(['user', 'attributes', 'name']);
    const provider  = state.auth.getIn(['user', 'attributes', 'provider']);
    const uid       = state.auth.getIn(['user', 'attributes', 'uid']);

    return { signedIn, name, provider, uid };
  }

  return { signedIn };
}
