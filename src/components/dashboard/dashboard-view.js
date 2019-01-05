import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';
import { Card } from 'semantic-ui-react';
import { requestGetDashboardStats } from '../../actions/app-actions';
import {MONITORING_STATUS_POLLING_DURATION} from '../../constants/misc'

class DashboardView extends Component {
  /***************************
   *         CONSTRUCTOR
   ***************************/
  constructor(){
    super();

    this.state = {}
  }

  /***************************
   *         VIEWS
   ***************************/
  getSectionContentView = () => {
    const { t, dashboardStats } = this.props;
    const initialCount = 0;
    
    return(
      <Card.Group className="section-content">
        <Card className="card-wrapper">
          <Card.Content className="card-content">
            <Card.Header className="header">
              {dashboardStats ? dashboardStats.dashboardStats.monitoring_urls_count : initialCount}
            </Card.Header>
            <Card.Description className="description" content={t('dashboard.monitoringUrls')} />
          </Card.Content>
        </Card>

        <Card className="card-wrapper">
          <Card.Content className="card-content">
            <Card.Header className="header">
              {dashboardStats ? dashboardStats.dashboardStats.up_monitoring_urls_count : initialCount}
            </Card.Header>
            <Card.Description className="description" content={t('dashboard.URLsDown')} />
          </Card.Content>
        </Card>

        <Card className="card-wrapper">
          <Card.Content className="card-content">
            <Card.Header className="header">
              {dashboardStats ? dashboardStats.dashboardStats.down_monitoring_urls_count : initialCount}
            </Card.Header>
            <Card.Description className="description" content={t('dashboard.URLsUp')} />
          </Card.Content>
        </Card>
      </Card.Group>
    )
  }

  /***************************
   *         METHODS
   ***************************/
  getDashboardStats = () => {
    this.props.requestGetDashboardStats();
  }

  /***************************
   *         LIFECYCLE
   ***************************/
  componentDidMount(){
    this.getDashboardStats();
    
    let interval = setInterval(()=>{
      this.getDashboardStats();
    }, MONITORING_STATUS_POLLING_DURATION*1000);
    this.setState({intervalObj : interval});
  }

  componentWillUnmount(){
    const { intervalObj } = this.state;
    if(intervalObj){
      clearInterval(intervalObj);
    }
  }

  render(){
    const { t } = this.props;

    return(
      <div className="dashboard-view">
        <div className="main-heading">{t('dashboard.Statistics')}</div>

        <div className="section-content-wrapper">
          { this.getSectionContentView() }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    dashboardStats: state.uptime.dashboardStats
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    requestGetDashboardStats: requestGetDashboardStats
  },dispatch)
}

export default translate(['translations'], translateOptions)(connect(mapStateToProps, mapDispatchToProps)(DashboardView));