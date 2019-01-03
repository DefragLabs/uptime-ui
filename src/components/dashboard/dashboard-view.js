import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';
import { Card } from 'semantic-ui-react';

class DashboardView extends Component {

  /***************************
   *         VIEWS
   ***************************/
  getSectionContentView = () => {
    return(
      <Card.Group className="section-content">
        <Card className="card-wrapper">
          <Card.Content className="card-content">
            <Card.Header className="header" content='20' />
            <Card.Description className="description" content='Total URLs' />
          </Card.Content>
        </Card>

        <Card className="card-wrapper">
          <Card.Content className="card-content">
            <Card.Header className="header" content='2' />
            <Card.Description className="description" content='Down URLs' />
          </Card.Content>
        </Card>

        <Card className="card-wrapper">
          <Card.Content className="card-content">
            <Card.Header className="header" content='10' />
            <Card.Description className="description" content='Random Number' />
          </Card.Content>
        </Card>
      </Card.Group>
    )
  }

  /***************************
   *         LIFECYCLE
   ***************************/
  render(){
    const { t } = this.props;

    return(
      <div className="dashboard-view">
        <div className="main-heading">{t('dashboard.Statistics')}</div>

        <div className="section-content-wrapper">
          { this.getSectionContentView() }
        </div>
      </div>
    )
  }
}

export default translate(['translations'], translateOptions)(connect(null, null)(DashboardView));