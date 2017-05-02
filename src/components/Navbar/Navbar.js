import React from 'react';
import './Navbar.css';
// import base from '../../base';
import {Button, Dropdown, NavItem} from 'react-materialize'

class Navbar extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <div className="container">
            <div className="nav-wrapper">
              <div className="col s12">
                <a href="#" className="brand-logo">Rankings App</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li>

                  </li>
                  <li>
                    <Dropdown
                      trigger={
                        <a data-belowOrigin="true">
                          <img src="http://materializecss.com/images/yuna.jpg" className="responsive-img circle profile-img" />
                        </a>
                      }

                      >
                      <NavItem>one</NavItem>
                      <NavItem>two</NavItem>
                      <NavItem divider />
                      <NavItem>three</NavItem>
                    </Dropdown>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

Navbar.contextTypes = {
  router: React.PropTypes.object
}

export default Navbar;