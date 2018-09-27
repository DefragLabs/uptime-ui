import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../../../i18n/config';
import { Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class RegisterMessageView extends Component {
  /***************************
   *        CONSTRUCTOR
   ***************************/
  constructor(props) {
    super(props);
  }

  /***************************
   *         LIFECYCLE
   ***************************/
  render(){
    const { t, registerSuccess, registerError } = this.props;

    return(
      <Form className="register-success-form">
        {
          registerSuccess &&
          <div className="sucess-msg">
            {t('auth.registerSuccessMsg')}
          </div>
        }
        {
          registerError &&
          <div className="error-msg">
            {t('auth.registerFailureMsg')}
          </div>
        }
        <div className="register-msg-footer-wrapper">
          <div className="links-wrapper">
            {
              registerSuccess &&
              <Link className="back-to-login-link" to="/">
                <Button className="app-btn" type='button'>{t('auth.login')}</Button>
              </Link>
            }
            {
              registerError &&
              <Button className="app-btn back-to-register" type='button' onClick={()=>this.props.handleClearError()}>{t('auth.register')}</Button>
            }
          </div>
        </div>
      </Form>
    )
  }
}

export default translate(['translations'], translateOptions)(RegisterMessageView);