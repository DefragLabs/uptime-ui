import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LoginView from '../components/auth-module/login-view/login-view';
import ForgotPasswordView from '../components/auth-module/forgot-password-view/forgot-password-view';
import ResetPasswordView from '../components/auth-module/reset-password-view/reset-password-view';
import RegisterView from '../components/auth-module/register-view/register-view';

import BaseLayout from '../components/base-layout/base-layout-view';
import DashboardView from '../components/dashboard/dashboard-view';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     isUserActive() ? <Component {...props} /> : <Redirect to={getRedirectionUrl({...rest}, props)} />
//   )} />
// );

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    true ? <Component {...props} /> : <Redirect to='/' />
  )} />
);

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LoginView} />
        <Route exact path='/forgot-password' component={ForgotPasswordView} />
        <Route exact path='/reset/:uid/:token' component={ResetPasswordView} />
        <Route exact path='/register' component={RegisterView} />
        
        <BaseLayout>
          <PrivateRoute exact path='/dashboard' component={DashboardView} />
        </BaseLayout>
      </Switch>
    </BrowserRouter>
  )
}