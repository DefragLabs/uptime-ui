import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';

class DashboardView extends Component {
  /***************************
   *       CONSTRUCTOR
   ***************************/
  constructor(props) {
    super(props);
    
    this.state={};
  }

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

function mapStateToProps(state) {
  return {
    
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    
  },dispatch)
}

export default translate(['translations'], translateOptions)(connect(mapStateToProps, mapDispatchToProps)(DashboardView));