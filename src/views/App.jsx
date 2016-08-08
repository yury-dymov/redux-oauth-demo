import React, { Component, PropTypes }  from 'react';
import Grid                             from 'react-bootstrap/lib/Grid';

import AppBar                           from 'containers/AppBarContainer';

export default class App extends Component {
  static propTypes = {
    children:       PropTypes.any,
  };

  render() {
    const { children } = this.props;

    return (
      <div id='app-view'>
        <AppBar />
        <Grid>
          {children}
        </Grid>
      </div>
    );
  }
}
