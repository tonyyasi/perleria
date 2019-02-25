import * as React from 'react';


import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App  from '../App';
import { Header } from '../components/Header';
import {About} from '../components/About/About';


export const Routes = () => (
  <BrowserRouter >
  <div>
    <Header />
    <Switch>
      <Route exact={true} path='/' component={App} />
      <Route exact={true} path='/about' component={About} />
    </Switch>
    </div>
  </BrowserRouter>
);