import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';
import { Grid, Form, Button } from 'semantic-ui-react';
import { EMAIL } from '../../constants/misc';
import { trimAndLowerCaseString } from '../../utils/string-utils';

import IntegrationsTableView from '../common/integrations-table-view';
import ErrorMessageView from '../common/error-message-view';
import EmptyStateView from '../common/empty-state-view';

class EmailIntegrationsView extends Component {
  /***************************
   *        CONSTRUCTOR
   ***************************/
  constructor() {
    super();
    this.state = {
      email: '',
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
      email: value,
      errors: {}
    });
  }

  handleSubmit = (e)=> {
    e.preventDefault();
    const formValidationFeedback = this.handleFormValidation(this.state);
    if(formValidationFeedback.isFormValid){
      const { email } = this.state;
      const params ={
        email: email,
        type: trimAndLowerCaseString(EMAIL)
      };
      this.props.addIntegrationCallback(params);
      this.setState({
        email: '',
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

    if(state['email'] === ''){
      formIsValid = false;
      errors["email"] = "*This field is required.";
    }

    result['errors'] = errors;
    result['isFormValid'] = formIsValid;
    return result;
  }

  /***************************
   *         VIEWS
   ***************************/
  getEmailIntegrationFormView() {
    const { t } = this.props;
    const { email, errors, integrationAddResponse, isSuccess, isError } = this.state;
    return (
      <div className="add-email-integration-form-wrapper">
        <Form name="form" onSubmit={this.handleSubmit}>
          <Form.Field>
            <input
              name='email'
              type='email'
              aria-label="Email"
              placeholder={t('auth.emailAddress')}
              onChange={this.handleChange}
              value={email}
              className={`${errors['email'] && 'highlight-input'}`}
            />
            {errors['email'] && this.getFieldErrorView(errors["email"])}
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
    return (
      <IntegrationsTableView
        {...this.props}
        recordCollection={integrations.email}
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
  
  render() {
    const { integrations } = this.props;
    const dataAvailableCheck = (integrations != undefined && integrations.email);

    return (
      <Grid className='email-integration-view-wrapper' divided='vertically'>
        <Grid.Row >
          <Grid.Column width={6} className="integration-form-section">
            { this.getEmailIntegrationFormView() }
          </Grid.Column>
          <Grid.Column width={10} className="integration-list-section">
            { dataAvailableCheck ? this.getIntegrationTableView(integrations) : this.getTableEmptyState()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default translate(['translations'], translateOptions)(EmailIntegrationsView);
