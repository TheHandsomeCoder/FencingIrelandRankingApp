import 'react-materialize'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'
import 'materialize-social/materialize-social.css'
import 'font-awesome/css/font-awesome.css'

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import base from './base';

import './css/style.css';
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import NotFound from './components/NotFound'

const Root = () => {

  return (


      <BrowserRouter>
        <div>
          <Switch>
            <Route path='/login' component={Login} />
            <PrivateRoute path='/' component={Navbar} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>

  )
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

render(<Root/>, document.querySelector('#main'));
