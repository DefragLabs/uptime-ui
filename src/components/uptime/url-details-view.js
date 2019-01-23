import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translateOptions } from '../../i18n/config';
import { Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { requestGetUrlDetails , requestGetUrlResults} from '../../actions/app-actions';

import LineChartView from '../common/line-chart/line-chart-view';
import { MONITORING_URL_RESULTS_FILTER } from '../../constants/menu-collection';

class MonitorUrlDetailsView extends Component {
  /***************************
   *         CONSTRUCTOR
   ***************************/
  constructor(){
    super();

    this.state={
      selectedFilter: MONITORING_URL_RESULTS_FILTER[0].value
    }

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }
  
  /***************************
   *         VIEWS
   ***************************/
  getBackBtnView = () => {
    return(
      <div className="back-btn-wrapper">
        <Link to="/uptime">
          <Icon name="arrow left" />
        </Link>
      </div>
    )
  }

  getHeaderView = (details) => {
    const { t } = this.props;

    return(
      <div className="main-heading">
        {t('uptime.monitoringDetailsViewHeading')}&nbsp;
        <a>{details.name}</a>
      </div>
    )
  }

  getFiltersView = () => {
    const { t } = this.props;
    const { selectedFilter } = this.state;

    return(
      <div className="filters-view">
        <div className="label">{t('common.filterBy')}</div>
        <Dropdown
          selection
          compact
          wrapSelection={false}
          defaultValue={selectedFilter}
          options={MONITORING_URL_RESULTS_FILTER}
          onChange={this.handleFilterChange}
          placeholder={t('common.chooseAnOption')}
        />
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
  init = (params) => {
    this.props.requestGetUrlDetails(params);
    this.props.requestGetUrlResults(params);
  }

  handleFilterChange(e, { value }){
    this.setState({selectedFilter: value}, ()=>{
      const { match } = this.props;
      const { selectedFilter } = this.state;
      const params = {
        urlId: match.params.urlId,
        selectedFilter
      }
      this.props.requestGetUrlResults(params);
    });
  }

  /***************************
   *         LIFECYCLE
   ***************************/
  componentDidMount(){
    const { selectedFilter } = this.state;
    const { match } = this.props;
    const params = {
      urlId: match.params.urlId,
      selectedFilter
    }

    this.init(params);
  }

  render(){
    const { monitoringURLResults, monitoringURLDetails, t } = this.props;
    
    return(
      <div className="uptime-details-view">
        <div className="heading-wrapper">
          {this.getBackBtnView()}
          
          {monitoringURLDetails && this.getHeaderView(monitoringURLDetails)}
        </div>
        <div className="filters-wrapper">
          {this.getFiltersView()}
        </div>
          
        <div className="section-content-wrapper">
          <div className="chart-wrapper">
            {monitoringURLResults && <LineChartView {...this.props} data={monitoringURLResults} />}
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