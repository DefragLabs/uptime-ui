import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import HeaderView from '../common/header-view';
import SideBarView from '../common/side-bar-view';
import AppLoaderView from '../common/app-loader-view';

export class BaseLayoutView extends Component {

  /***************************
   *         LIFECYCLE
   ***************************/
  render(){
    const { isLoading } = this.props;
    
    return(
      <div className="base-layout-view">
        <HeaderView {...this.props} />

        <div className="main-content-wrapper">
          <SideBarView {...this.props} />
          
          <main className="main-content">
            {this.props.children}
          </main>
        </div>

        {isLoading && <AppLoaderView />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.uptime.isLoading
  };
}

export default withRouter(translate(['translations'], translateOptions)(connect(mapStateToProps, null)(BaseLayoutView)));