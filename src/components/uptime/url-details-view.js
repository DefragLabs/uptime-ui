import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translateOptions } from '../../i18n/config';

import { requestGetUrlDetails } from '../../actions/app-actions';

class MonitorUrlDetailsView extends Component {
  
  /***************************
   *         LIFECYCLE
   ***************************/
  componentDidMount(){
    const urlParams = this.props.match.params;
    this.props.requestGetUrlDetails(urlParams)
  }

  componentWillReceiveProps(newProps){
    console.log(newProps);
  }

  render(){
    return(
      <div className="uptime-details-view">
        <div className="main-heading">Monitoring URL Details</div>
        
        <div className="section-content-wrapper">
          Details 
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    monitoringURLDetails: state.uptime.monitoringURLDetails,
    isLoading: state.uptime.isLoading
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    requestGetUrlDetails: requestGetUrlDetails
  },dispatch)
}

export default translate(['translations'], translateOptions)(connect(mapStateToProps, mapDispatchToProps)(MonitorUrlDetailsView));