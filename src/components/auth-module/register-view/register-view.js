import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../../i18n/config';
import { Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import ErrorMessageView from '../../common/error-message-view';
import { isValidEmail } from '../../../utils/validation-utils';
import RegisterMessageView from './register-message/register-message';

class RegisterView extends Component {
  /***************************
   *        CONSTRUCTOR
   ***************************/
  constructor(props) {
    super(props);

    this.state={
      fields: {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
      },
      serverError: "",
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormValidation = this.handleFormValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      // API call for register request
      this.setState({showErrorMessage: true});
    }else{
      this.setState({errors:formValidationFeedback.errors});
    }
  }

  handleFormValidation(fields){
    let errors = {};
    let formIsValid = true;
    let result = {};

    if(fields['firstName'] === ''){
      formIsValid = false;
      errors["firstName"] = "*This field is required.";
    }
    if(fields['email'] === ''){
      formIsValid = false;
      errors["email"] = "*This field is required.";
    } else if(typeof fields["email"] !== "undefined"){
      if (!isValidEmail(fields["email"])) {
        formIsValid = false;
        errors["email"] = "Please provide valid email id.";
      }
    }
    if(fields['phoneNumber'] === ''){
      formIsValid = false;
      errors["phoneNumber"] = "*This field is required.";
    }

    result['errors'] = errors;
    result['isFormValid'] = formIsValid;
    return result;   
  }

  handleClearError() {
    this.setState({showErrorMessage: false, showSuccessMessage: false});
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
          <div className="register-view-form-wrapper">
            <div className="heading">{t('auth.registerHeading')}</div>
            {
              this.state.showSuccessMessage &&
              <RegisterMessageView
              registerSuccess={this.state.showSuccessMessage}
              handleClearError={()=>this.handleClearError()}/>
            }
            {
              this.state.showErrorMessage &&
              <RegisterMessageView
              registerError={this.state.showErrorMessage}
              handleClearError={()=>this.handleClearError()}/>
            }
            {
              !this.state.showSuccessMessage && !this.state.showErrorMessage &&
              <Form className="register-form" onSubmit= {this.handleSubmit}>
                <Form.Field>
                  <input
                    name='companyName'
                    type='text'
                    placeholder={t('auth.companyName')}
                    onChange={this.handleChange}
                    value={fields["companyName"]}
                    className={`${errors['companyName'] && 'highlight-input'}`}
                  />
                  {errors['companyName'] && this.getFieldErrorView(errors["companyName"])}
                </Form.Field>
                <Form.Field>
                  <input
                    name='firstName'
                    type='text'
                    placeholder={t('auth.firstName')}
                    onChange={this.handleChange}
                    value={fields["firstName"]}
                    className={`${errors['email'] && 'highlight-input'}`}
                  />
                  {errors['firstName'] && this.getFieldErrorView(errors["firstName"])}
                </Form.Field>
                <Form.Field>
                  <input
                    name='lastName'
                    type='text'
                    placeholder={t('auth.lastName')}
                    onChange={this.handleChange}
                    value={fields["lastName"]}
                    className={`${errors['lastName'] && 'highlight-input'}`}
                  />
                  {errors['lastName'] && this.getFieldErrorView(errors["lastName"])}
                </Form.Field>
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
                <Form.Field>
                  <input
                    name='phoneNumber'
                    type='number'
                    placeholder={t('auth.phoneNumber')}
                    onChange={this.handleChange}
                    value={fields["phoneNumber"]}
                    className={`${errors['phoneNumber'] && 'highlight-input'}`}
                  />
                  {errors['phoneNumber'] && this.getFieldErrorView(errors["phoneNumber"])}
                </Form.Field>
                <div className="error-msg-wrapper">
                  { serverError && this.getFieldErrorView(serverError)}
                </div>
                <div className="register-footer-wrapper">
                  <div className="links-wrapper">
                    {t('auth.accountExists')}
                    <Link className="back-to-login-link" to="/">
                      <Button className="app-btn" type='button'>{t('auth.login')}</Button>
                    </Link>
                  </div>
                  <div className="btn-wrapper">
                    <Button className="app-btn" type='submit'>{t('common.submit')}</Button>
                  </div>
                </div>
              </Form>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default translate(['translations'], translateOptions)(RegisterView);