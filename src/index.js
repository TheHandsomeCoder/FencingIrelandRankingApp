import 'react-materialize'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'
import 'materialize-social/materialize-social.css'
import 'font-awesome/css/font-awesome.css'

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import base from './base';

import './css/style.css';
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import NotFound from './components/NotFound'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={
     (props) => isAuthenticated === false
        ? <Component {...props} />
        : <Redirect to='/' />
      }
  />
)


class Root extends React.Component {
  state = {
    isAuthenticated: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = base.onAuth((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    });
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <Switch>
            <PublicRoute isAuthenticated={this.state.authed} path='/login' component={Login} />
            <PrivateRoute isAuthenticated={this.state.authed} path='/' component={Navbar} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

render(<Root/>, document.querySelector('#main'));
