import React, { PropTypes, Component }  from 'react';

import OAuthButton                      from 'containers/OAuthSignInButton';
import UserInfoContainer                from 'containers/UserInfoContainer';

export default class extends Component {
  render() {
    return (
      <div>
        <h2>Sign in</h2>
        <OAuthButton provider='github'>GitHub</OAuthButton>
        <UserInfoContainer />
      </div>
    );
  }
}
