import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';
import { EMAIL, SLACK, PAGER_DUTY } from '../../constants/misc';
import {
  requestGetIntegrations,
  requestAddIntegration,
  requestDeleteIntegration
} from '../../actions/app-actions';

import EmailIntegrationsView from './email-integrations-view';
import SlackIntegrationsView from './slack-integrations-view';
import PagerDutyIntegrationsView from './pager-duty-integrations-view';

class IntegrationsView extends Component {
  
  /***************************
   *         METHODS
   ***************************/
  init = () => {
    this.props.requestGetIntegrations();
  }

  handleAddEmailIntegration = (params) => {
    this.props.requestAddIntegration(params);
  }

  handleAddSlackIntegration = (params) => {
    this.props.requestAddIntegration(params);
  }

  // handleAddPagerDutyIntegration = (params) => {
  //   this.props.requestAddIntegration(params);
  // }

  handleDeleteIntegration = (params) => {
    this.props.requestDeleteIntegration(params)
  }
  /***************************
   *         VIEWS
   ***************************/
  getTabsView = () => {
    const panes = [
      { menuItem: EMAIL, render: () =>  this.getEmailIntegrationsView() },
      { menuItem: SLACK, render: () =>  this.getSlackIntegrationsView() },
      // { menuItem: PAGER_DUTY, render: () => this.getPagerDutyIntegrationsView() }
    ];

    return(
      <Tab panes={panes} />
    )
  }

  getEmailIntegrationsView = () => {
    const { integrations } = this.props;

    return(
      <Tab.Pane className="tab-content-view">
        <EmailIntegrationsView
          integrations={integrations}
          addIntegrationCallback={(params)=> this.handleAddEmailIntegration(params)}
          integrationDeleteCallback={(params)=> this.handleDeleteIntegration(params)}
         />
      </Tab.Pane>
    )
  }

  getSlackIntegrationsView = () => {
    const { integrations } = this.props;

    return(
      <Tab.Pane className="tab-content-view">
        <SlackIntegrationsView
          integrations={integrations}
          addIntegrationCallback={(params)=> this.handleAddSlackIntegration(params)}
          integrationDeleteCallback={(params)=> this.handleDeleteIntegration(params)}
        />
      </Tab.Pane>
    )
  }

  getPagerDutyIntegrationsView = () => {
    const { integrations } = this.props;

    return(
      <Tab.Pane className="tab-content-view">
        <PagerDutyIntegrationsView
          integrations={integrations}
          addIntegrationCallback={(params)=> this.handleAddPagerDutyIntegration(params)}
        />
      </Tab.Pane>
    )
  }

  /***************************
   *         LIFECYCLE
   ***************************/
  componentDidMount(){
    this.init();
  }

  render(){
    const { t } = this.props;

    return(
      <div className="integrations-view">
        <div className="main-heading">{t('integrations.heading')}</div>

        <div className="section-content-wrapper">
          { this.getTabsView() }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    addIntegrationResponse: state.uptime.addIntegrationResponse,
    integrations: state.uptime.integrations
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    requestGetIntegrations: requestGetIntegrations,
    requestAddIntegration: requestAddIntegration,
    requestDeleteIntegration: requestDeleteIntegration
  },dispatch)
}

export default translate(['translations'], translateOptions)(connect(mapStateToProps, mapDispatchToProps)(IntegrationsView));