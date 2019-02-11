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
  requestDeleteMonitoringUrls, 
  requestResetMonitoringUrlsVariable
} from '../../actions/app-actions';
import { isEqual } from 'lodash';
import { MONITORING_STATUS_POLLING_DURATION } from '../../constants/misc';

import ModalView from './modal-view';
import SearchBarView from '../common/search-bar-view';

export class UpTimeView extends Component {
  /***************************
   *         CONSTRUCTOR
   ***************************/
  constructor(){
    super();

    this.state = {
      searchQuery: "",
      isModalVisible: false
    }
  }

  /***************************
   *         VIEWS
   ***************************/
  getSectionHeaderView = () => {
    const { t } = this.props;
    return(
      <div className="section-header-content">
        <SearchBarView
          {...this.props}
          searchQueryCallback={(searchQuery)=> this.handleSearchQuery(searchQuery)}
        />
        <Button
          data-test-id='add-button'
          className="app-btn add-monitoring-url-btn"
          type='button'
          onClick={this.showModal}
        >
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
        <Table celled selectable>
          <Table.Header>
            { this.getTableHeaderView(headers) }
          </Table.Header>
          <Table.Body className="table-body">
            { monitoringURLs.length ? 
                monitoringURLs.map((URLDetails) => { return this.getTableBodyRowView(URLDetails) }) : 
                this.getEmptyStateView() }
          </Table.Body>
        </Table>
      </div>
    )
  }

  getTableHeaderView = () => {
    const { t } = this.props;
    return(
      <Table.Row>
        <Table.HeaderCell className="uppercase" key="name">{t('uptime.name')}</Table.HeaderCell>
        <Table.HeaderCell className="uppercase" key="protocol">{t('common.protocol')}</Table.HeaderCell>
        <Table.HeaderCell className="uppercase" key="url">{t('common.url')}</Table.HeaderCell>
        <Table.HeaderCell className="uppercase" key="frequency">{t('common.frequency')}</Table.HeaderCell>
        <Table.HeaderCell className="uppercase" key="unit">{t('common.unit')}</Table.HeaderCell>
        <Table.HeaderCell className="uppercase" key="status">{t('common.status')}</Table.HeaderCell>
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
        <Table.Cell>{URLDetails.name}</Table.Cell>
        <Table.Cell>{URLDetails.protocol}</Table.Cell>
        <Table.Cell>{URLDetails.url}</Table.Cell>
        <Table.Cell>{URLDetails.frequency}</Table.Cell>
        <Table.Cell>{URLDetails.unit}</Table.Cell>
        <Table.Cell>{this.getStatusIcon(URLDetails.status)}</Table.Cell>
        <Table.Cell className="action-icons-wrapper">
          <Icon
            name="times rectangle"
            className="delete-icon cursor"
            data-id={URLDetails.id}
            onClick={this.deleteMonitoringUrl}
          />
          <Icon
            name="edit outline"
            className="cursor"
            data-id={URLDetails.id}
            onClick={this.handleEdit}
          />
        </Table.Cell>
      </Table.Row>
    )
  }
  
  getStatusIcon = (status) => {
    if(status === 'UP'){
      return <div className="status-icon up"></div>
    } else if(status === 'DOWN'){
      return <div className="status-icon down"></div>
    }
    return <div className="status-icon unknown"></div>
  }

  getEmptyStateView = () => {
    const { t } = this.props;

    return(
      <Table.Row className="empty-state-wrapper">
        <Table.Cell style={Styles.alignCenter}>
          {t('common.emptyStateMessage')}
        </Table.Cell>
      </Table.Row>
    )
  }

  /***************************
   *         METHODS
   ***************************/
  getMonitoringUrls = (searchQuery) => {
    this.props.requestMonitoringUrls(searchQuery);
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

  deleteMonitoringUrl = (event) => {
    event.stopPropagation();
    const urlId = event.currentTarget.dataset.id;
    this.props.requestDeleteMonitoringUrls(urlId);
  }

  handleEdit = (event) => {
    event.stopPropagation();
    const { monitoringURLs } = this.props.monitoringURLs;
    const urlId = event.currentTarget.dataset.id;
    let details;

    for(let urlIndx=0; urlIndx<monitoringURLs.length; urlIndx){
      const URLDetails = monitoringURLs[urlIndx];
      if(URLDetails.id === urlId){
        details = URLDetails;
        break;
      }
    }

    this.showModal(details);
  }

  handleUpdateUrl(params, urlId){
    params['id']= urlId;
    params['frequency']= parseInt(params.frequency);
    this.props.requestUpdateMonitoringUrls(params);
  }

  navigateToUrlDetailView = (urlId) => {
    this.props.history.push(`/monitoring-url/${urlId}`);
  }

  handleSearchQuery = (searchQuery) => {
    this.setState({searchQuery}, ()=> {
      this.getMonitoringUrls(this.state.searchQuery);
    })
  }

  showModal = (details) => {
    this.setState({
      isModalVisible: true,
      editDetails: details
    });
  }

  hideModal = () => {
    this.setState({isModalVisible: false});
  }

  /***************************
   *         LIFECYCLE
   ***************************/
  componentDidMount(){
    this.getMonitoringUrls(this.state.searchQuery);
    
    let interval = setInterval(()=>{
      this.getMonitoringUrls(this.state.searchQuery);
    }, MONITORING_STATUS_POLLING_DURATION*1000);
    this.setState({intervalObj : interval});
  }

  componentWillReceiveProps(newProps){
    if(!isEqual(newProps.monitoringURLs, this.monitoringURLs)){
      if(newProps.isURLResponseModified){
        this.hideModal();

        this.props.requestResetMonitoringUrlsVariable();
      }
    }
  }

  componentWillUnmount(){
    const { intervalObj } = this.state;
    if(intervalObj){
      clearInterval(intervalObj);
    }
  }

  render(){
    const { monitoringURLs, t } = this.props;
    const { isModalVisible, editDetails } = this.state;

    return(
      <div className="uptime-view">
        <div className="main-heading">{t('uptime.uptimeMonitoring')}</div>

        <div className="section-header">
          { this.getSectionHeaderView() }
        </div>
        
        <div className="section-content-wrapper">
          { monitoringURLs && this.getSectionContentView() }
        </div>

        {isModalVisible && <ModalView
          isModalVisible={isModalVisible}
          onRef={ref => (this.child = ref)}
          addMonitoringUrls={(params)=> this.handleAddUrl(params)}
          updateMonitoringUrls={(params, urlId)=> this.handleUpdateUrl(params, urlId)}
          hideModalCallback={()=> this.hideModal()}
          editDetails={editDetails}
        />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    monitoringURLs: state.uptime.monitoringURLs,
    isURLResponseModified: state.uptime.isURLResponseModified
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    requestAddMonitoringUrls: requestAddMonitoringUrls,
    requestUpdateMonitoringUrls: requestUpdateMonitoringUrls,
    requestMonitoringUrls: requestMonitoringUrls,
    requestDeleteMonitoringUrls: requestDeleteMonitoringUrls,
    requestResetMonitoringUrlsVariable: requestResetMonitoringUrlsVariable
  },dispatch)
}

const Styles = {
  alignCenter: {
    position: 'absolute',
    left: '50%'
  }
}
export default withRouter(translate(['translations'], translateOptions)(connect(mapStateToProps, mapDispatchToProps)(UpTimeView)));