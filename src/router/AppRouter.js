import * as React from 'react';


import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App  from '../App';
import Login from '../components/Login/Login';
import { Header } from '../components/Header';
import {About} from '../components/About/About';
import {About} from '../components/Contact/Contact';
import Admin from '../components/Admin/Admin';
import Cart from '../components/Cart/Cart';


export const Routes = () => (
  <BrowserRouter >
  <div>
    <Header />
    <Switch>
      <Route exact={true} path='/' component={Login} />
      <Route exact={true} path='/about' component={About} />
      <Route exact={true} path='/admin' component={Admin} />
      <Route exact={true} path='/contact' component={Contact} />
      <Route exact={true} path='/cart' component={Cart} />
    </Switch>
    </div>
  </BrowserRouter>
);