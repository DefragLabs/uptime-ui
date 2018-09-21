import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeView from '../components/home-view/home-view';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomeView} />
      </Switch>
    </BrowserRouter>
  )
}