import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LoginView from '../components/auth-module/login-view/login-view';
import ForgotPasswordView from '../components/auth-module/forgot-password-view/forgot-password-view';
import ResetPasswordView from '../components/auth-module/reset-password-view/reset-password-view';
import RegisterView from '../components/auth-module/register-view/register-view';

import BaseLayout from '../components/base-layout/base-layout-view';
import DashboardView from '../components/dashboard/dashboard-view';
import UpTimeView from '../components/uptime/uptime-view';
import MonitorView from '../components/monitor/monitor-view';
import IntegrationView from '../components/integrations/integrations-view';
import MonitorUrlDetailsView from '../components/uptime/url-details-view';

import { isUserActive } from '../helpers/auth-helpers';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isUserActive() ? <Component {...props} /> : <Redirect to="/" />
  )} />
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isUserActive() ? <Redirect to="/dashboard" /> : <Component {...props} />
  )} />
);

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path='/' component={LoginView} />
        <PublicRoute exact path='/forgot-password' component={ForgotPasswordView} />
        <PublicRoute exact path='/reset/:uid/:token' component={ResetPasswordView} />
        <PublicRoute exact path='/register' component={RegisterView} />
        
        <BaseLayout >
          <PrivateRoute exact path='/dashboard' component={DashboardView} />
          <PrivateRoute exact path='/uptime' component={UpTimeView} />
          <PrivateRoute exact path='/monitor' component={MonitorView} />
          <PrivateRoute exact path='/integration' component={IntegrationView} />

          <PrivateRoute exact path='/monitoring-url/:urlId' component={MonitorUrlDetailsView} />
        </BaseLayout>
      </Switch>
    </BrowserRouter>
  )
}