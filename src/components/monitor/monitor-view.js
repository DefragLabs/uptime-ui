import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';

class MonitorView extends Component {
  
  /***************************
   *         LIFECYCLE
   ***************************/
  render(){
    return(
      <div className="monitor-view">
        Monitor view
      </div>
    )
  }
}

export default translate(['translations'], translateOptions)(MonitorView);