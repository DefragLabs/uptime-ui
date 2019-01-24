import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';
import { Grid, Form, Button } from 'semantic-ui-react';
import { SLACK } from '../../constants/misc';
import { trimAndLowerCaseString } from '../../utils/string-utils';

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
        type: trimAndLowerCaseString(SLACK)
      };
      this.props.addIntegrationCallback(params);
      this.setState({
        webhookURL: '',
        errors: {}
      });
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

  getAddIntegrationFormView() {
    const { t } = this.props;
    const { webhookURL, errors, integrationAddResponse, isError, isSuccess } = this.state;
    return (
      <div className="add-integration-form-wrapper">
        <Form name="form" onSubmit={this.handleSubmit}>
          <Form.Field>
            <input
              name='webhookURL'
              type='text'
              aria-label="Webhook URL"
              placeholder={t('integrations.webhookURL')}
              onChange={this.handleChange}
              value={webhookURL}
              className={`${errors['webhookURL'] && 'highlight-input'}`}
            />
            {errors['webhookURL'] && this.getFieldErrorView(errors["webhookURL"])}
          </Form.Field>

          <div className="error-msg-container">
            {isError && <div className="auth-error-msg">{integrationAddResponse}</div>}
            {isSuccess && <div className="auth-success-msg">{integrationAddResponse}</div>}
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
    const integrationType = trimAndLowerCaseString(SLACK)
    return (
      <IntegrationsTableView
        {...this.props}
        recordCollection={integrations[integrationType]}
        integrationDeleteCallback={(params)=> this.props.integrationDeleteCallback(params)}
      />
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
    const integrationType = trimAndLowerCaseString(SLACK)

    return (
      <Grid className='slack-integration-view-wrapper' divided='vertically'>
        <Grid.Row >
          <Grid.Column width={6} className="integration-form-section">
            { this.getAddIntegrationFormView() }
          </Grid.Column>
          <Grid.Column width={10} className="integration-list-section">
            { integrations[integrationType] ? this.getIntegrationTableView(integrations) : this.getTableEmptyState()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default translate(['translations'], translateOptions)(SlackIntegrationsView);
