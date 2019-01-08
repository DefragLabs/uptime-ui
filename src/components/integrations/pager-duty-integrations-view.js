import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';
import { Grid, Form, Button } from 'semantic-ui-react';

import IntegrationsTableView from '../common/integrations-table-view';
import ErrorMessageView from '../common/error-message-view';
import EmptyStateView from '../common/empty-state-view';

class PagerDutyIntegrationsView extends Component {
  /***************************
   *        CONSTRUCTOR
   ***************************/
  constructor() {
    super();
    this.state = {
      "pdRoutingKey": "",
      "pdAction": "",
      "pdSeverity": "",
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /***************************
   *         METHODS
   ***************************/
  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
      errors: {}
    });
  }

  handleSubmit = (e)=> {
    e.preventDefault();
    const formValidationFeedback = this.handleFormValidation(this.state);
    if(formValidationFeedback.isFormValid){
      const { pdRoutingKey, pdAction, pdSeverity } = this.state;
      const params ={
        pdRoutingKey,
        pdAction,
        pdSeverity,
        type: "pagerduty"
      };
      this.props.addIntegrationCallback(params);
    }else{
      this.setState({errors:formValidationFeedback.errors});
    }
  }

  handleFormValidation(state){
    let errors = {};
    let formIsValid = true;
    let result = {};

    if(state['pdRoutingKey'] === ''){
      formIsValid = false;
      errors["pdRoutingKey"] = "*This field is required.";
    } else if(state['pdAction'] === ''){
      formIsValid = false;
      errors["pdAction"] = "*This field is required.";
    } else if(state['pdSeverity'] === ''){
      formIsValid = false;
      errors["pdSeverity"] = "*This field is required.";
    }

    result['errors'] = errors;
    result['isFormValid'] = formIsValid;
    return result;
  }

  /***************************
   *         LIFECYCLE
   ***************************/
  componentWillReceiveProps(newProps) {
    if (newProps.isSuccess && !newProps.isError) {
      this.setState({
        integrationAddResponse: newProps.integrationAddResponse,
        isSuccess: newProps.isSuccess,
        isError: newProps.isError
      });
    } else if (!newProps.isSuccess && newProps.isError) {
      this.setState({
        integrationAddResponse: newProps.integrationAddResponse,
        isSuccess: newProps.isSuccess,
        isError: newProps.isError
      });
    }
  }

  getAddIntegrationFormView() {
    const { t } = this.props;
    const { pdRoutingKey, pdAction, pdSeverity, errors } = this.state;
    return (
      <div className="add-integration-form-wrapper">
        <Form name="form" onSubmit={this.handleSubmit}>
          <Form.Field>
            <input
              name='pdRoutingKey'
              type='text'
              aria-label="Routing key"
              placeholder={t('integrations.pdRoutingKey')}
              onChange={this.handleChange}
              value={pdRoutingKey}
              className={`${errors['pdRoutingKey'] && 'highlight-input'}`}
            />
            {errors['pdRoutingKey'] && this.getFieldErrorView(errors["pdRoutingKey"])}
          </Form.Field>
          <Form.Field>
            <input
              name='pdAction'
              type='text'
              aria-label="Action"
              placeholder={t('integrations.pdAction')}
              onChange={this.handleChange}
              value={pdAction}
              className={`${errors['pdAction'] && 'highlight-input'}`}
            />
            {errors['pdAction'] && this.getFieldErrorView(errors["pdAction"])}
          </Form.Field>
          <Form.Field>
            <input
              name='pdSeverity'
              type='text'
              aria-label="Severity"
              placeholder={t('integrations.pdSeverity')}
              onChange={this.handleChange}
              value={pdSeverity}
              className={`${errors['pdSeverity'] && 'highlight-input'}`}
            />
            {errors['pdSeverity'] && this.getFieldErrorView(errors["pdSeverity"])}
          </Form.Field>

          <div className="error-msg-container">
            {this.state.isError && <div className="auth-error-msg">{this.state.integrationAddResponse}</div>}
            {this.state.isSuccess && <div className="auth-success-msg">{this.state.integrationAddResponse}</div>}
          </div>

          <div className="btn-wrapper">
            <Button className="app-btn" type='submit'>
              {t('common.submit')}
            </Button>
          </div>
        </Form>
      </div>
    );
  };

  getIntegrationTableView(integrations) {
    return (
      <IntegrationsTableView recordCollection={integrations.pagerduty} />
    );
  };

  getFieldErrorView(error){
    return(
      <ErrorMessageView error={error} />
    )
  }

  getTableEmptyState() {
    const { t } = this.props;

    return (
      <EmptyStateView message={t('integrations.noIntegrationAvailable')} />
    );
  };

  render() {
    const { integrations } = this.props;

    return (
      <Grid className='pager-duty-integrations-view' divided='vertically'>
        <Grid.Row >
          <Grid.Column width={6} className="integration-form-section">
            { this.getAddIntegrationFormView() }
          </Grid.Column>
          <Grid.Column width={10} className="integration-list-section">
            { integrations.pagerduty ? this.getIntegrationTableView(integrations) : this.getTableEmptyState()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default translate(['translations'], translateOptions)(PagerDutyIntegrationsView);
