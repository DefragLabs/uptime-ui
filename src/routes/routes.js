import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginView from '../components/auth-module/login-view/login-view';
import ForgotPasswordView from '../components/auth-module/forgot-password-view/forgot-password-view';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LoginView} />
        <Route exact path='/forgot-password' component={ForgotPasswordView} />
      </Switch>
    </BrowserRouter>
  )
}