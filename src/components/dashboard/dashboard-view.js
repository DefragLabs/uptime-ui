import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';

class DashboardView extends Component {

  /***************************
   *         LIFECYCLE
   ***************************/
  render(){
    return(
      <div className="dashboard-view">
        Dashboard view
      </div>
    )
  }
}

export default translate(['translations'], translateOptions)(connect(null, null)(DashboardView));