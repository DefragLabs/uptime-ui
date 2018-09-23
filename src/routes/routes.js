import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginView from '../components/auth-module/login-view/login-view';
import ForgotPasswordView from '../components/auth-module/forgot-password-view/forgot-password-view';
import ResetPasswordView from '../components/auth-module/reset-password-view/reset-password-view';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LoginView} />
        <Route exact path='/forgot-password' component={ForgotPasswordView} />
        <Route exact path='/reset/:uid/:token' component={ResetPasswordView} />
      </Switch>
    </BrowserRouter>
  )
}