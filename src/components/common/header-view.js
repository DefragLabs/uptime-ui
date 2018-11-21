import React, { Component } from 'react';
import { Image, Container, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { DEFAULT_USER } from '../../constants/image-references';

export default class HeaderView extends Component {

  /***************************
   *          VIEWS
   ***************************/
  getPopupContentView = () => {
    return(
      <div className="user-profile-popup-content-view">
        <div className="user-name">Pravin Parkhi</div>
        <Link to="/profile" className="popup-link profile-link">Profile</Link>
        <div className="popup-link logout-link">Logout</div>
      </div>
    )
  }

   /***************************
    *       LIFECYCLE
    ***************************/
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