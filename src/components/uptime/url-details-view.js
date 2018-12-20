import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translateOptions } from '../../i18n/config';
import LineChartView from '../common/line-chart-view';

import { requestGetUrlDetails , requestGetUrlResults} from '../../actions/app-actions';

class MonitorUrlDetailsView extends Component {
  
  /***************************
   *         METHODS
   ***************************/
  init = (urlParams) => {
    this.props.requestGetUrlDetails(urlParams);
    this.props.requestGetUrlResults(urlParams);
  }

  /***************************
   *         LIFECYCLE
   ***************************/
  componentDidMount(){
    const urlParams = this.props.match.params;
    this.init(urlParams);
  }

  render(){
    const { monitoringURLResults } = this.props;
    return(
      <div className="uptime-details-view">
        <div className="main-heading">Monitoring URL Details</div>
        
        <div className="section-content-wrapper">
          <div className="chart-wrapper">
            {monitoringURLResults && <LineChartView data={monitoringURLResults} />}
          </div>
          
          <div className="details-wrapper">

          </div>
        </div>


      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    monitoringURLDetails: state.uptime.monitoringURLDetails,
    monitoringURLResults: state.uptime.monitoringURLResults,
    isLoading: state.uptime.isLoading
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    requestGetUrlDetails: requestGetUrlDetails,
    requestGetUrlResults: requestGetUrlResults
  },dispatch)
}

export default translate(['translations'], translateOptions)(connect(mapStateToProps, mapDispatchToProps)(MonitorUrlDetailsView));