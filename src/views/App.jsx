import React, { PropTypes }  from 'react';
import Grid                  from 'react-bootstrap/lib/Grid';

import AppBar                from 'containers/AppBarContainer';

import './bundle.css';

const propTypes = {
  children: PropTypes.any
};

function App({ children }) {
  return (
    <div>
      <AppBar />
      <Grid>
        {children}
      </Grid>
    </div>
  );
}

App.propTypes = propTypes;

export default App;
