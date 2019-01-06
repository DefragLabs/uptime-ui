import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';
import { Grid, Form, Button } from 'semantic-ui-react';
import { SLACK } from '../../constants/misc';

import IntegrationsTableView from '../common/integrations-table-view';
import ErrorMessageView from '../common/error-message-view';
import EmptyStateView from '../common/empty-state-view';

class SlackIntegrationsView extends Component {
  /***************************
   *        CONSTRUCTOR
   ***************************/
  constructor() {
    super();
    this.state = {
      webhookURL: '',
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /***************************
   *         METHODS
   ***************************/
  handleChange(e) {
    const { value } = e.target;
    
    this.setState({
      webhookURL: value,
      errors: {}
    });
  }

  handleSubmit = (e)=> {
    e.preventDefault();
    const formValidationFeedback = this.handleFormValidation(this.state);
    if(formValidationFeedback.isFormValid){
      const { webhookURL } = this.state;
      const params ={
        webhookURL,
        type: SLACK
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

    if(state['webhookURL'] === ''){
      formIsValid = false;
      errors["webhookURL"] = "*This field is required.";
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

  getEmailIntegrationFormView() {
    const { t } = this.props;
    const { webhookURL, errors } = this.state;
    return (
      <div className="add-integration-form-wrapper">
        <Form name="form" onSubmit={this.handleSubmit}>
          <Form.Field>
            <input
              name='webhookURL'
              type='text'
              placeholder={t('integrations.webhookURL')}
              onChange={this.handleChange}
              value={webhookURL}
              className={`${errors['webhookURL'] && 'highlight-input'}`}
            />
            {errors['webhookURL'] && this.getFieldErrorView(errors["webhookURL"])}
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
      <IntegrationsTableView recordCollection={integrations[SLACK]} />
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
      <div className="empty-state-view">
        <EmptyStateView message={t('integrations.noIntegrationAvailable')} />
      </div>
    );
  };

  render() {
    const { integrations } = this.props;

    return (
      <Grid className='slack-integration-view-wrapper' divided='vertically'>
        <Grid.Row >
          <Grid.Column width={6} className="integration-form-section">
            { this.getEmailIntegrationFormView() }
          </Grid.Column>
          <Grid.Column width={10} className="integration-list-section">
            { integrations[SLACK] ? this.getIntegrationTableView(integrations) : this.getTableEmptyState()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default translate(['translations'], translateOptions)(SlackIntegrationsView);
