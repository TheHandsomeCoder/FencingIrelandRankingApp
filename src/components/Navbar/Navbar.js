import React from 'react';
import './Navbar.css';
// import base from '../../base';
import {Button, Dropdown, NavItem} from 'react-materialize'
import base from '../../base'

class Navbar extends React.Component {

  componentDidMount(){
    const user = base.auth().currentUser;
  }

  logout() {
    base.unauth();
  }

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
                    <Dropdown
                      trigger={
                        <a data-belowOrigin="true" data-constrainwidth="false" data-alignment="right">
                          <img alt="profile" src="http://materializecss.com/images/yuna.jpg" className="responsive-img circle profile-img" />
                        </a>
                      }>
                      <NavItem><Button onClick={() => this.logout()}>Logout</Button></NavItem>
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
