import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { translateOptions } from '../../i18n/config';

import { Button, Table, Icon } from 'semantic-ui-react';
import { 
  requestMonitoringUrls,
  requestAddMonitoringUrls,
  requestUpdateMonitoringUrls,
  requestDeleteMonitoringUrls
} from '../../actions/app-actions';
import { isEqual } from 'lodash';
import ModalView from './modal-view';

class UpTimeView extends Component {

  /***************************
   *         VIEWS
   ***************************/
  getSectionHeaderView = () => {
    const { t } = this.props;
    return(
      <div className="section-header-content">
        <Button className="app-btn add-monitoring-url-btn" type='button' onClick={()=> this.child.show()}>
          {t('uptime.addURL')}
        </Button>
      </div>
    )
  }

  getSectionContentView = () => {
    const { monitoringURLs } = this.props.monitoringURLs;
    // Take first url object to extra all possible headers.
    const headers = this.getTableHeaders(monitoringURLs[0]);

    return(
      <div className="section-content">
        <Table celled inverted selectable>
          <Table.Header>
            { this.getTableHeaderView(headers) }
          </Table.Header>
          <Table.Body className="table-body">
            { monitoringURLs.map((URLDetails) => { return this.getTableBodyRowView(URLDetails) }) }
          </Table.Body>
        </Table>
      </div>
    )
  }

  getTableHeaderView = (columnHeadings) => {
    const { t } = this.props;
    return(
      <Table.Row>
        { columnHeadings.map((column, index) => { return this.getHeaderCellView(column, index) })}
        <Table.HeaderCell className="uppercase" key="action">{t('common.actions')}</Table.HeaderCell>
      </Table.Row>
    )
  }

  getHeaderCellView = (column, index) => {
    return(
      <Table.HeaderCell className="uppercase" key={index}>{column}</Table.HeaderCell>
    )
  }

  getTableBodyRowView = (URLDetails) => {
    return(
      <Table.Row className="table-row cursor" key={URLDetails.id} onClick={()=> this.navigateToUrlDetailView(URLDetails.id)}>
        <Table.Cell>{URLDetails.protocol}</Table.Cell>
        <Table.Cell>{URLDetails.url}</Table.Cell>
        <Table.Cell>{URLDetails.frequency}</Table.Cell>
        <Table.Cell>{URLDetails.unit}</Table.Cell>
        <Table.Cell>{this.getStatusIcon(URLDetails.status)}</Table.Cell>
        <Table.Cell className="action-icons-wrapper">
          <Icon
            name="times rectangle"
            className="delete-icon cursor"
            onClick={(e) => this.deleteMonitoringUrl(e, URLDetails.id)}
          />
          <Icon
            name="edit outline"
            className="cursor"
            onClick={(e) => this.child.show(URLDetails)}
          />
        </Table.Cell>
      </Table.Row>
    )
  }

  getStatusIcon = (status) => {
    if(status === 'UP'){
      return <Icon className="status-icon up" name="arrow alternate circle up" />
    } else if(status === 'DOWN'){
      return <Icon className="status-icon down" name="arrow alternate circle down" />
    }
    return <Icon className="status-icon unknown" name="times circle" />
  }

  /***************************
   *         METHODS
   ***************************/
  getMonitoringUrls = () => {
    this.props.requestMonitoringUrls();
  }

  getTableHeaders = (object) => {
    let headers = [];
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        const excludedProps = (
          property !== "id" && 
          property !== "userID" && 
          property !== "results"
        )
        if(excludedProps){
          headers.push(property);
        }
      }
    }
    return headers;
  }

  handleAddUrl = (params) => {
    this.props.requestAddMonitoringUrls(params);
  }

  deleteMonitoringUrl = (event, urlId) => {
    event.preventDefault();
    this.props.requestDeleteMonitoringUrls(urlId);
  }

  handleUpdateUrl(params, urlId){
    params['id']= urlId;
    params['frequency']= parseInt(params.frequency);
    this.props.requestUpdateMonitoringUrls(params);
  }

  navigateToUrlDetailView = (urlId) => {
    // this.props.history.push(`/monitoring-url/${urlId}`);
  }

  /***************************
   *         LIFECYCLE
   ***************************/
  componentDidMount(){
    this.getMonitoringUrls();
  }

  componentWillReceiveProps(newProps){
    if(!isEqual(newProps.monitoringURLs, this.monitoringURLs)){
      this.child.closeModal();
    }
  }

  render(){
    const { monitoringURLs, t } = this.props;
    return(
      <div className="uptime-view">
        <div className="main-heading">{t('uptime.uptimeMonitoring')}</div>

        <div className="section-header">
          { this.getSectionHeaderView() }
        </div>
        
        <div className="section-content-wrapper">
          { monitoringURLs && this.getSectionContentView() }
        </div>

        <ModalView
          onRef={ref => (this.child = ref)}
          addMonitoringUrls={(params)=> this.handleAddUrl(params)}
          updateMonitoringUrls={(params, urlId)=> this.handleUpdateUrl(params, urlId)}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    monitoringURLs: state.uptime.monitoringURLs,
    isLoading: state.uptime.isLoading
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    requestAddMonitoringUrls: requestAddMonitoringUrls,
    requestUpdateMonitoringUrls: requestUpdateMonitoringUrls,
    requestMonitoringUrls: requestMonitoringUrls,
    requestDeleteMonitoringUrls: requestDeleteMonitoringUrls
  },dispatch)
}

export default withRouter(translate(['translations'], translateOptions)(connect(mapStateToProps, mapDispatchToProps)(UpTimeView)));