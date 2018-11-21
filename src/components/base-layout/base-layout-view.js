import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';

import HeaderView from '../common/header-view';
import SideBarView from '../common/side-bar-view';

class BaseLayoutView extends Component {

  /***************************
   *         LIFECYCLE
   ***************************/
  render(){
    return(
      <div className="base-layout-view">
        <HeaderView />

        <div className="main-content-wrapper">
          <SideBarView {...this.props} />
          
          <main className="main-content">
            {this.props.children}
          </main>
        </div>
      </div>
    )
  }
}

export default translate(['translations'], translateOptions)(BaseLayoutView);