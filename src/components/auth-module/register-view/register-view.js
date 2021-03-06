import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { translateOptions } from '../../../i18n/config';
import { Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { isValidEmail } from '../../../utils/validation-utils';
import { requestRegister } from '../../../actions/app-actions';

import ErrorMessageView from '../../common/error-message-view';
import RegisterMessageView from './register-message/register-message';
import {isUserSessionActive} from '../../../helpers/auth-helpers'

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
        phoneNumber: '',
        companyName: '',
        password: ''
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
      const { fields } = this.state;
      this.props.requestRegister(fields);
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
    } else if(typeof fields["email"] !== undefined){
      if (!isValidEmail(fields["email"])) {
        formIsValid = false;
        errors["email"] = "Please provide valid email id.";
      }
    }
    if(fields['phoneNumber'] === ''){
      formIsValid = false;
      errors["phoneNumber"] = "*This field is required.";
    }
    if(fields['password'] === '') {
      formIsValid = false;
      errors["password"] = "*This field is required.";
    } else if(fields['password'].length < 8) {
      formIsValid = false;
      errors["password"] = "*Password should contain minimum 8 characters.";
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

  getRegisterResponseMessage(showSuccessMessage, showErrorMessage) {
    return (
      <RegisterMessageView
        registerSuccess={showSuccessMessage}
        registerError={showErrorMessage}
        handleClearError={()=>this.handleClearError()}
      />
    );
  }

  getRegisterView() {
    const { t } = this.props;
    const { errors, fields, serverError } = this.state;
    return(
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
            name='phoneNumber'
            type='number'
            placeholder={t('auth.phoneNumber')}
            onChange={this.handleChange}
            value={fields["phoneNumber"]}
            className={`${errors['phoneNumber'] && 'highlight-input'}`}
          />
          {errors['phoneNumber'] && this.getFieldErrorView(errors["phoneNumber"])}
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
            name='password'
            type='password'
            placeholder={t('auth.password')}
            onChange={this.handleChange}
            value={fields["password"]}
            className={`${errors['password'] && 'highlight-input'}`}
          />
          {errors['password'] && this.getFieldErrorView(errors["password"])}
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
    )
  }

  /***************************
   *         LIFECYCLE
   ***************************/
  componentWillReceiveProps = (newProps) => {
    if (isUserSessionActive(newProps.userSession) !== isUserSessionActive(this.props.userSession)){
      this.props.history.push(`/dashboard`);
    }
  }

  render(){
    const { t } = this.props;
    const { showErrorMessage, showSuccessMessage } = this.state;

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
              showSuccessMessage &&
              this.getRegisterResponseMessage(showSuccessMessage,showErrorMessage)
            }
            {
              showErrorMessage &&
              this.getRegisterResponseMessage(showSuccessMessage,showErrorMessage)
            }
            {
              !showSuccessMessage && !showErrorMessage &&
              this.getRegisterView()
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userSession: state.auth.userSession,
    isLoading: state.auth.isLoading
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    requestRegister: requestRegister
  },dispatch)
}

export default translate(['translations'], translateOptions)(connect(mapStateToProps, mapDispatchToProps)(RegisterView));