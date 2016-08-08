import React, { Component, PropTypes }  from 'react';

import LinkContainer                    from 'react-router-bootstrap/lib/LinkContainer';
import IndexLink                        from 'react-router/lib/IndexLink';

import Navbar                           from 'react-bootstrap/lib/Navbar';
import Nav                              from 'react-bootstrap/lib/Nav';
import NavItem                          from 'react-bootstrap/lib/NavItem';


export default class extends Component {
  static propTypes = {
    isSignedIn:           PropTypes.bool,
    onLogout:             PropTypes.func,
    expanded:             PropTypes.bool,
    onMenuToggle:         PropTypes.func
  };

  handleSignOutClick = (e) => {
    e.preventDefault();

    this.props.onLogout();
  };

  render() {
    const { isSignedIn, expanded, onMenuToggle } = this.props;

    return (
      <Navbar expanded={expanded} onToggle={onMenuToggle}>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to='/' activeStyle={{ color: '#33e0ff' }}>
              <span>Home</span>
            </IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav navbar>
            {isSignedIn && <LinkContainer to='/client'>
              <NavItem>Client Side</NavItem>
            </LinkContainer>}
            {isSignedIn && <LinkContainer to='/server'>
              <NavItem>Server Side</NavItem>
            </LinkContainer>}
          </Nav>
          <Nav navbar pullRight>
            {isSignedIn && <LinkContainer to='/sign-out' onClick={this.handleSignOutClick}>
              <NavItem>Sign Out</NavItem>
            </LinkContainer>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
