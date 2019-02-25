import * as React from 'react';


import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App  from '../App';
import Login from '../components/Login/Login';
import { Header } from '../components/Header';
import {About} from '../components/About/About';


export const Routes = () => (
  <BrowserRouter >
  <div>
    <Header />
    <Switch>
      <Route exact={true} path='/' component={Login} />
      <Route exact={true} path='/about' component={About} />
    </Switch>
    </div>
  </BrowserRouter>
);