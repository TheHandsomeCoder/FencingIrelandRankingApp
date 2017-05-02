import 'react-materialize'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'
import 'materialize-social/materialize-social.css'
import 'font-awesome/css/font-awesome.css'

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css';
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import NotFound from './components/NotFound';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/login" component={Login} />
        <Match exactly pattern="/" component={Navbar} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root/>, document.querySelector('#main'));
