import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';

class DashboardView extends Component {
  /***************************
   *       CONSTRUCTOR
   ***************************/
  constructor(props) {
    super(props);

    this.state={};
  }

  /***************************
   *          METHODS
   ***************************/

  /***************************
   *          VIEWS
   ***************************/

  /***************************
   *         LIFECYCLE
   ***************************/
  render(){
    const { t } = this.props;

    return(
      <div className="dashboard-view">
       Hello dashboarcd
      </div>
    )
  }
}

export default translate(['translations'], translateOptions)(DashboardView);