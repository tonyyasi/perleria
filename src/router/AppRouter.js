import * as React from 'react';


import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App  from '../App';
import Login from '../components/Login/Login';
import { Header } from '../components/Header';
import {About} from '../components/About/About';
import {About} from '../components/Contact/Contact';


export const Routes = () => (
  <BrowserRouter >
  <div>
    <Header />
    <Switch>
      <Route exact={true} path='/' component={Login} />
      <Route exact={true} path='/about' component={About} />
      <Route exact={true} path='/contact' component={Contact} />
    </Switch>
    </div>
  </BrowserRouter>
);