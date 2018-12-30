import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translateOptions } from '../../i18n/config';
import { Button, Modal, Form, Select, Input, Dropdown } from 'semantic-ui-react';

import ErrorMessageView from '../common/error-message-view'

const protocolOptions = [
  { key: 'http', text: 'http', value: 'http' },
  { key: 'https', text: 'https', value: 'https' },
]

const frequencyOptions = [
  { key: '1', text: '1', value: '1', disabled: false },
  { key: '5', text: '5', value: '5', disabled: false },
  { key: '15', text: '15', value: '15', disabled: false },
  { key: '30', text: '30', value: '30', disabled: false },
]

const unitOptions = [
  { key: 'seconds', text: 'seconds', value: 'second', disabled: false },
  { key: 'minute', text: 'minute', value: 'minute', disabled: false }
]

class ModalView extends Component {
  
  /***************************
   *         CONSTRUCTOR
   ***************************/
  constructor(){
    super();
    this.state = {
      open: false,
      isEdit: false,
      
      fields: {
        protocol: 'https',
        url: '',
        frequency: '30',
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
   *         METHODS
   ***************************/
  show = (urlDetails) => {
    const { protocol, frequency, unit } = this.state.fields;
    let fields = this.state.fields;

    fields['protocol'] = urlDetails ? urlDetails.protocol : protocol;
    fields['url'] = urlDetails ? urlDetails.url : '';
    fields['frequency'] = urlDetails ? urlDetails.frequency.toString() : frequency.toString();
    fields['unit'] = urlDetails ? urlDetails.unit : unit;

    if(urlDetails !== undefined){
      this.setState({
        isEdit: true,
        urlId: urlDetails.id
      })
    }
    this.setState({
      open: true,
      fields
    })
  }

  closeModal = () => this.setState({ open: false })

  addMonitoringUrls = () => {
    const { fields } = this.state;
    const formValidationFeedback = this.handleFormValidation(fields);
    if(formValidationFeedback.isFormValid){
      this.props.addMonitoringUrls(fields); 
    } else {
      this.setState({
        errors: formValidationFeedback.errors
      });
    }
  }

  updateMonitoringUrls = () => {
    const { fields, urlId } = this.state;
    const formValidationFeedback = this.handleFormValidation(fields);
    if(formValidationFeedback.isFormValid){
      this.props.updateMonitoringUrls(fields, urlId);
    } else {
      this.setState({
        errors: formValidationFeedback.errors
      });
    }
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
    if(value !== "30"){
      unitOptions[0]['disabled'] = true;
    } else {
      unitOptions[0]['disabled'] = false;
    }
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

  handleFormValidation(fields){
    let errors = {};
    let formIsValid = true;
    let result = {};

    if(fields['url'] === ''){
      formIsValid = false;
      errors["url"] = "*This field is required.";
    } else if((fields["frequency"] !== '30') && 
      (fields["unit"] === 'second')){
      formIsValid = false;
      errors["frequency"] = "*Please select valid unit/frequency.";
    }

    result['errors'] = errors;
    result['isFormValid'] = formIsValid;
    return result;
  }

  /***************************
   *         VIEWS
   ***************************/
  getProtocolOptionsView = () =>{
    const { fields } = this.state;

    return(
      <Dropdown
        value={fields['protocol']}
        options={protocolOptions}
        onChange={this.handleProtocolChange}
      />
    )
  }

  getFieldErrorView(error){
    return(
      <ErrorMessageView error={error} />
    )
  }

  /***************************
   *         LIFECYCLE
   ***************************/
  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
    this.setState({
      isEdit: false,
      urlId: undefined
    })
  }

  render(){
    const { open, fields, errors, serverError, isEdit } = this.state;
    const { t } = this.props;

    return(
      <Modal open={open} onClose={this.closeModal} size="tiny">
          <Modal.Header>{t('uptime.addMonitoringUrl')}</Modal.Header>
          <Modal.Content>
            <Form className="login-form" onSubmit= {this.handleSubmit}>
              <Form.Field>
                <label>{t('uptime.url')}</label>
                <Input
                  name='url'
                  label={this.getProtocolOptionsView()}
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
                  value={fields["frequency"]}
                  onChange={this.handleFrequencyChange}
                />
                <Form.Field
                  control={Select}
                  label='Unit' 
                  options={unitOptions} 
                  placeholder='Unit'
                  value={fields["unit"]}
                  onChange={this.handleUnitChange}
                />
              </Form.Group>
              {errors['frequency'] && this.getFieldErrorView(errors["frequency"])}
              
              <div className="error-msg-wrapper">
                { serverError && this.getFieldErrorView(serverError)}
              </div>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.closeModal}>{t('common.cancel')}</Button>
            {isEdit ? <Button
              positive
              content="Save"
              onClick={()=> this.updateMonitoringUrls()}
            /> : <Button
            positive
            content="Save"
            onClick={()=> this.addMonitoringUrls()}
          />}
          </Modal.Actions>
        </Modal>
    )
  }
}

export default withRouter(translate(['translations'], translateOptions)(connect(null, null)(ModalView)));