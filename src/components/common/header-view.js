import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';

import { Image, Container, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { DEFAULT_USER } from '../../constants/image-references';
import { requestLogout } from '../../actions/app-actions'
import { isUserSessionActive, clearLocalStorage } from '../../helpers/auth-helpers'

class HeaderView extends Component {

  /***************************
   *          METHODS
   ***************************/
  logout = () => {
    this.props.requestLogout();
  }

  /***************************
   *          VIEWS
   ***************************/
  getPopupContentView = () => {
    return(
      <div className="user-profile-popup-content-view">
        <div className="user-name">Pravin Parkhi</div>
        <Link to="/profile" className="popup-link profile-link">Profile</Link>
        <div className="popup-link logout-link" onClick={this.logout}>Logout</div>
      </div>
    )
  }

   /***************************
    *       LIFECYCLE
    ***************************/
   componentWillReceiveProps(newProps){
    if (isUserSessionActive(newProps.userSession) !== isUserSessionActive(this.props.userSession)){
      this.props.history.push(`/`);
      clearLocalStorage();
    }
  }

  render(){
    return(
      <header className='header-view'>
        <Container>
          <div className="user-info-wrapper">
            <Popup
              trigger={<Image circular src={DEFAULT_USER} />}
              content={this.getPopupContentView()}
              on='click'
              hideOnScroll
            />
          </div>
        </Container>
      </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    userSession: state.auth.userSession
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    requestLogout: requestLogout
  },dispatch)
}

export default translate(['translations'], translateOptions)(connect(mapStateToProps, mapDispatchToProps)(HeaderView));