import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../../i18n/config';
import { Button, Form } from 'semantic-ui-react';

import ErrorMessageView from '../../common/error-message-view';
import { isValidEmail } from '../../../utils/validation-utils';

class LoginView extends Component {
  /***************************
   * CONSTRUCTOR
   ***************************/
  constructor(props) {
    super(props);

    this.state={
      fields: {
        email: '',
        password: ''
      },
      serverError: "",
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
  }

  /***************************
   * METHODS
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
        email: fields.email,
        password: fields.password
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
    } else if(fields["password"] === ''){
      formIsValid = false;
      errors["password"] = "*This field is required.";
    }

    result['errors'] = errors;
    result['isFormValid'] = formIsValid;
    return result;
  }

  /***************************
   * VIEWS
   ***************************/
  getFieldErrorView(error){
    return(
      <ErrorMessageView error={error} />
    )
  }

  /***************************
   * LIFECYCLE
   ***************************/
  componentDidMount(){

  }

  componentWillUnmount(){

  }

  render(){
    const { t } = this.props;
    const { errors, fields, serverError } = this.state;

    console.log("test console");
    number=2.2;
    var test = parseInt(number)
    console.log(test)

    return(
      <div className="login-view">
        <div className="login-view-form-wrapper">
          <div className="heading">{t('auth.login')}</div>
          <Form className="login-form" onSubmit= {this.handleSubmit}>
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
            <div className="btn-wrapper">
              <Button className="app-btn" type='submit'>{t('auth.login')}</Button>
              <div className="forgot-password-link">{t('auth.forgotPassword')}</div>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default translate(['translations'], translateOptions)(LoginView);