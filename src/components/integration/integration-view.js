import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';

class IntegrationsView extends Component {
  
  /***************************
   *         LIFECYCLE
   ***************************/
  render(){

    return(
      <div className="integrations-view">
        Integration view
      </div>
    )
  }
}

export default translate(['translations'], translateOptions)(IntegrationsView);