import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../../i18n/config';
import { Button, Form } from 'semantic-ui-react';

import ErrorMessageView from '../../common/error-message-view';
import {isPasswordEqual} from "../../../utils/validation-utils";

class ResetPasswordView extends Component {
  /***************************
   *       CONSTRUCTOR
   ***************************/
  constructor(props) {
    super(props);

    this.state={
      fields: {
        newPassword: '',
        confirmPassword: ''
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
        newPassword: fields.newPassword,
        confirmPassword: fields.confirmPassword
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

    if(fields["newPassword"] === ''){
      formIsValid = false;
      errors["newPassword"] = "*This field is required.";
    } else if(fields["confirmPassword"] === ''){
      formIsValid = false;
      errors["confirmPassword"] = "*Please retype new password";
    } else if(isPasswordEqual(fields["newPassword"], fields["confirmPassword"])){
      formIsValid = false;
      errors["confirmPassword"] = "Password mismatch.";
    }

    result['errors'] = errors;
    result['isFormValid'] = formIsValid;
    return result;
  }

  /***************************
   *          VIEWS
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
          <div className="reset-password-view-form-wrapper">
            <div className="heading">{t('auth.resetPassword')}</div>
            <Form className="reset-password-form" onSubmit= {this.handleSubmit}>
              <Form.Field>
                <input
                  name='New Password'
                  type='password'
                  placeholder={t('auth.newPassword')}
                  onChange={this.handleChange}
                  value={fields["newPassword"]}
                  className={`${errors['newPassword'] && 'highlight-input'}`}
                />
                {errors['email'] && this.getFieldErrorView(errors["newPassword"])}
              </Form.Field>
              <Form.Field>
                <input
                  name='Confirm Password'
                  type='password'
                  placeholder={t('auth.confirmPassword')}
                  onChange={this.handleChange}
                  value={fields["confirmPassword"]}
                  className={`${errors['confirmPassword'] && 'highlight-input'}`}
                />
                {errors['confirmPassword'] && this.getFieldErrorView(errors["confirmPassword"])}
              </Form.Field>
              <div className="error-msg-wrapper">
                { serverError && this.getFieldErrorView(serverError)}
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

export default translate(['translations'], translateOptions)(ResetPasswordView);