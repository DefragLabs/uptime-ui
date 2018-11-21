import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';

class IntegrationsView extends Component {
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
      <div className="integrations-view">
        Integrations view
      </div>
    )
  }
}

export default translate(['translations'], translateOptions)(IntegrationsView);