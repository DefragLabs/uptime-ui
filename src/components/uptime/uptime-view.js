import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { translateOptions } from '../../i18n/config';

import { Button, Table, Modal, Form, Select, Input, Dropdown, Icon } from 'semantic-ui-react';
import { 
  requestMonitoringUrls, 
  requestAddMonitoringUrls, 
  requestDeleteMonitoringUrls
} from '../../actions/app-actions';
import { isEqual } from 'lodash';

const protocolOptions = [
  { key: 'http', text: 'http', value: 'http' },
  { key: 'https', text: 'https', value: 'https' },
]

const frequencyOptions = [
  { key: '5', text: '5', value: 5 },
  { key: '10', text: '10', value: 10 },
  { key: '15', text: '15', value: 15 }
]

const unitOptions = [
  { key: 'seconds', text: 'seconds', value: 'second' },
  { key: 'minute', text: 'minute', value: 'minute' },
  { key: 'hour', text: 'hour', value: 'hour' }
]

class UpTimeView extends Component {
  
  /***************************
   *         CONSTRUCTOR
   ***************************/
  constructor(){
    super();
    this.state = {
      open: false,
      
      fields: {
        protocol: 'https',
        url: '',
        frequency: 5,
        unit: 'second'
      },

      serverError: "",
      errors: {}
    }

    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleProtocolChange = this.handleProtocolChange.bind(this);
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
  }

  /***************************
   *         VIEWS
   ***************************/
  getSectionHeaderView = () => {
    return(
      <div className="section-header-content">
        <Button className="app-btn add-monitoring-url-btn" type='button' onClick={this.show(true)}>
          Add URL
        </Button>
      </div>
    )
  }

  getAddMonitoringUrlModalView = () => {
    const { open, dimmer, fields, errors, serverError } = this.state;
    return(
      <Modal dimmer={dimmer} open={open} onClose={this.closeModal} size="tiny">
          <Modal.Header>Add Monitoring URL</Modal.Header>
          <Modal.Content>

          <Form className="login-form" onSubmit= {this.handleSubmit}>
            <Form.Field>
              <label>URL</label>
              <Input
                name='url'
                label={<Dropdown defaultValue='https' options={protocolOptions} onChange={this.handleProtocolChange} />}
                aria-label="URL"
                labelPosition='left'
                placeholder='Add URL'
                onChange={this.handleUrlChange}
                value={fields["url"]}
                className={`${errors['url'] && 'highlight-input'}`}
              />
                {errors['url'] && this.getFieldErrorView(errors["url"])}
              </Form.Field>
            
            <Form.Group widths='equal'>
              <Form.Field
                control={Select}
                label='Frequency' 
                options={frequencyOptions} 
                placeholder='Frequency'
                defaultValue={5}
                onChange={this.handleFrequencyChange}
              />
              <Form.Field
                control={Select}
                label='Unit' 
                options={unitOptions} 
                placeholder='Unit'
                defaultValue="second"
                onChange={this.handleUnitChange}
              />
            </Form.Group>
            
            <div className="error-msg-wrapper">
              { serverError && this.getFieldErrorView(serverError)}
            </div>
          </Form>

          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.closeModal}>Cancel</Button>
            <Button
              positive
              content="Save"
              onClick={()=> this.addMonitoringUrls()}
            />
          </Modal.Actions>
        </Modal>
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
          <Table.Body>
            { monitoringURLs.map((URLDetails) => { return this.getTableBodyRowView(URLDetails) }) }
          </Table.Body>
        </Table>
      </div>
    )
  }

  getTableHeaderView = (columnHeadings) => {
    return(
      <Table.Row>
        { columnHeadings.map((column, index) => { return this.getHeaderCellView(column, index) })}
        <Table.HeaderCell className="uppercase" key="action">ACTION</Table.HeaderCell>
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
      <Table.Row className="cursor" key={URLDetails.id} onClick={()=> this.navigateToUrlDetailView(URLDetails.id)}>
        <Table.Cell>{URLDetails.protocol}</Table.Cell>
        <Table.Cell>{URLDetails.url}</Table.Cell>
        <Table.Cell>{URLDetails.frequency}</Table.Cell>
        <Table.Cell>{URLDetails.unit}</Table.Cell>
        <Table.Cell>{this.getStatusIcon(URLDetails.status)}</Table.Cell>
        <Table.Cell>
          <Icon name="times rectangle" className="cursor" onClick={()=> this.deleteMonitoringUrl(URLDetails.id)} />
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

  show = dimmer => () => this.setState({ dimmer, open: true })

  closeModal = () => this.setState({ open: false })

  addMonitoringUrls = () => {
    const { fields } = this.state
    this.props.requestAddMonitoringUrls(fields);
  }

  deleteMonitoringUrl = (urlId) => {
    this.props.requestDeleteMonitoringUrls(urlId)
  }

  handleUrlChange(e){
    let fields = this.state.fields;
    const field = e.target.name;
    fields[field] = e.target.value;
    this.setState({
      fields,
      errors: {},
      serverError: ""
    })
  }

  handleProtocolChange(e, { value }){
    let fields = this.state.fields;
    fields['protocol'] = value;
    this.setState({
      fields
    })
  }

  handleFrequencyChange(e, { value }){
    let fields = this.state.fields;
    fields['frequency'] = value;
    this.setState({
      fields
    })
  }

  handleUnitChange(e, { value }){
    let fields = this.state.fields;
    fields['unit'] = value;
    this.setState({
      fields
    })
  }

  navigateToUrlDetailView = (urlId) => {
    this.props.history.push(`/monitoring-url/${urlId}`)
  }

  /***************************
   *         LIFECYCLE
   ***************************/
  componentDidMount(){
    this.getMonitoringUrls();
  }

  componentWillReceiveProps(newProps){
    if(!isEqual(newProps.monitoringURLs, this.monitoringURLs)){
      this.closeModal();
    }
  }

  render(){
    const { monitoringURLs } = this.props;
    return(
      <div className="uptime-view">
        <div className="main-heading">Uptime Monitoring</div>

        <div className="section-header">
          { this.getSectionHeaderView() }
        </div>
        
        <div className="section-content-wrapper">
          { monitoringURLs && this.getSectionContentView() }
        </div>

        { this.getAddMonitoringUrlModalView() }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    monitoringURLs: state.uptime.monitoringURLs,
    addMonitoringURLs: state.uptime.addMonitoringURLs,
    isLoading: state.uptime.isLoading
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    requestAddMonitoringUrls: requestAddMonitoringUrls,
    requestMonitoringUrls: requestMonitoringUrls,
    requestDeleteMonitoringUrls: requestDeleteMonitoringUrls
  },dispatch)
}

export default withRouter(translate(['translations'], translateOptions)(connect(mapStateToProps, mapDispatchToProps)(UpTimeView)));