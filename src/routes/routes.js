import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginView from '../components/auth-module/login-view/login-view';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LoginView} />
      </Switch>
    </BrowserRouter>
  )
}