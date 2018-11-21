import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';

class UpTimeView extends Component {
  /***************************
   *       CONSTRUCTOR
   ***************************/
  constructor(props) {
    super(props);

    this.state={};
  }

  /***************************
   *         LIFECYCLE
   ***************************/
  render(){
    const { t } = this.props;

    return(
      <div className="uptime-view">
        Uptime view
      </div>
    )
  }
}

export default translate(['translations'], translateOptions)(UpTimeView);