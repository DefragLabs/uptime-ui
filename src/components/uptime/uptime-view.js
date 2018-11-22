import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';

class UpTimeView extends Component {
  
  /***************************
   *         LIFECYCLE
   ***************************/
  render(){

    return(
      <div className="uptime-view">
        Uptime view
      </div>
    )
  }
}

export default translate(['translations'], translateOptions)(UpTimeView);