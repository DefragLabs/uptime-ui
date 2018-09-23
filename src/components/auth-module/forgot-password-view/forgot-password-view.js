import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../../i18n/config';
import { Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import ErrorMessageView from '../../common/error-message-view';
import { isValidEmail } from '../../../utils/validation-utils';

class ForgotPasswordView extends Component {
  /***************************
   *        CONSTRUCTOR
   ***************************/
  constructor(props) {
    super(props);

    this.state={
      fields: {
        email: ''
      },
      serverError: "",
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
  }

  /***************************
   *          METHODS
   ***************************/
  handleChange(e){
    let fields = this.state.fields;
    const field = e.target.name;
    fields[field] = e.target.value;
    this.setState({
      fields,
      errors: {},
      serverError: ""
    })
  }

  handleSubmit = (e)=> {
    e.preventDefault();
    const formValidationFeedback = this.handleFormValidation(this.state.fields);
    if(formValidationFeedback.isFormValid){
      const fields = this.state.fields;
      const params ={
        email: fields.email
      };
      // API call for login request
    }else{
      this.setState({errors:formValidationFeedback.errors});
    }
  }

  handleFormValidation(fields){
    let errors = {};
    let formIsValid = true;
    let result = {};

    if(fields['email'] === ''){
      formIsValid = false;
      errors["email"] = "*This field is required.";
    } else if(typeof fields["email"] !== "undefined"){
      if (!isValidEmail(fields["email"])) {
        formIsValid = false;
        errors["email"] = "Please provide valid email id.";
      }
    }

    result['errors'] = errors;
    result['isFormValid'] = formIsValid;
    return result;
  }

  /***************************
   *           VIEWS
   ***************************/
  getFieldErrorView(error){
    return(
      <ErrorMessageView error={error} />
    )
  }

  /***************************
   *         LIFECYCLE
   ***************************/
  render(){
    const { t } = this.props;
    const { errors, fields, serverError } = this.state;

    return(
      <div className="auth-form-view">
        <div className="left-section">
          <div className="brand-name">{t('common.brandName')}</div>
          <div className="left-section-marker"></div>
        </div>
        <div className="right-section">
          <div className="forgot-password-view-form-wrapper">
            <div className="heading">{t('auth.forgotPassword')}</div>
            <div className="screen-sub-heading">{t('auth.forgotPasswordInfo')}</div>
            <Form className="forgot-password-form" onSubmit= {this.handleSubmit}>
              <Form.Field>
                <input
                  name='email'
                  type='email'
                  placeholder={t('auth.emailAddress')}
                  onChange={this.handleChange}
                  value={fields["email"]}
                  className={`${errors['email'] && 'highlight-input'}`}
                />
                {errors['email'] && this.getFieldErrorView(errors["email"])}
              </Form.Field>
              <div className="error-msg-wrapper">
                { serverError && this.getFieldErrorView(serverError)}
              </div>
              <div className="links-wrapper">
                <Link className="back-to-login-link" to="/">{t('auth.backToLogin')}</Link>
              </div>
              <div className="btn-wrapper">
                <Button className="app-btn" type='submit'>{t('common.submit')}</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default translate(['translations'], translateOptions)(ForgotPasswordView);