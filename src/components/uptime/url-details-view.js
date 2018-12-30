import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translateOptions } from '../../i18n/config';
import { Card, Icon  } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { requestGetUrlDetails , requestGetUrlResults} from '../../actions/app-actions';

import LineChartView from '../common/line-chart/line-chart-view';

const description = [
  'Amy is a violinist with 2 years experience in the wedding industry.',
  'She enjoys the outdoors and currently resides in upstate New York.',
].join(' ')

class MonitorUrlDetailsView extends Component {
  
  /***************************
   *         VIEWS
   ***************************/
  getHeaderView = (details) => {
    const { t } = this.props;
    return(
      <div className="main-heading">
        {t('uptime.monitoringDetailsViewHeading')} 
        <a>{details.url}</a>
      </div>
    )
  }

  getSummaryView = (details) => {
    
    return(
      <div className="summary">
        <div className="summary-row">
          <div className="summary-key">{Object.keys(details)[5]}</div>
          <div className="summary-value">{details[Object.keys(details)[5]]}</div>
        </div>
        <div className="summary-row">
          <div className="summary-key">{Object.keys(details)[2]}</div>
          <div className="summary-value">{details[Object.keys(details)[2]]}</div>
        </div>
        <div className="summary-row">
          <div className="summary-key">{Object.keys(details)[4]}</div>
          <div className="summary-value">{details[Object.keys(details)[4]]}</div>
        </div>
        <div className="summary-row">
          <div className="summary-key">{Object.keys(details)[0]}</div>
          <div className="summary-value">{details[Object.keys(details)[0]]}</div>
        </div>
      </div>
    )
  }
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
    const { monitoringURLResults, monitoringURLDetails, t } = this.props;
    
    return(
      <div className="uptime-details-view">
        <div className="heading-wrapper">
          <div className="back-btn-wrapper">
            <Link to="/uptime">
              <Icon name="arrow left" />
            </Link>
          </div>
          {monitoringURLDetails && this.getHeaderView(monitoringURLDetails)}
        </div>
          
        <div className="section-content-wrapper">
          <div className="chart-wrapper">
            {monitoringURLResults && <LineChartView data={monitoringURLResults} />}
          </div>
          
          <div className="summary-wrapper">
            <div className="summary-heading">{t('common.summaryHeading')}</div>
            { monitoringURLDetails && this.getSummaryView(monitoringURLDetails) }
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