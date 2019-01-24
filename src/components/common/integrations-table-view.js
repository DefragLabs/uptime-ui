import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';

class IntegrationTableView extends Component {
  
  /***************************
   *       METHODS
   ***************************/
  deleteIntegration(integration) {
    let params = {
      id: integration.id
    }
    this.props.integrationDeleteCallback(params)
  }

  /***************************
   *       VIEWS
   ***************************/
  getTableHeaderView() {
    const { recordCollection, t } = this.props;
    const record = recordCollection[0];

    return (
      <Table.Row className="table-row">
        { record.email && <Table.HeaderCell className="extra-large-column">{t('integrations.email')}</Table.HeaderCell> }
        { record.webhookURL && <Table.HeaderCell className="extra-large-column">{t('common.webhookURL')}</Table.HeaderCell> }
        { record.pdRoutingKey && <Table.HeaderCell className="small-column align-left">{t('integrations.pdRoutingKey')}</Table.HeaderCell> }
        { record.pdSeverity && <Table.HeaderCell className="small-column align-left">{t('integrations.pdSeverity')}</Table.HeaderCell> }
        { record.pdAction && <Table.HeaderCell className="small-column align-left">{t('integrations.pdAction')}</Table.HeaderCell> }
        <Table.HeaderCell className="small-column">{t('common.actions')}</Table.HeaderCell>
      </Table.Row>
    )
  }

  getTableView() {
    const {recordCollection} = this.props;
    
    return (
      recordCollection.map((record) => {
        return (
          <Table.Row className="table-row" key={record.id}>
            { record.email && <Table.Cell className="extra-large-column">{ record.email }</Table.Cell> }
            { record.webhookURL && <Table.Cell className="extra-large-column">{ record.webhookURL }</Table.Cell> }
            { record.pdRoutingKey && <Table.Cell className="small-column align-left">{ record.pdRoutingKey }</Table.Cell> }
            { record.pdSeverity && <Table.Cell className="small-column align-left">{ record.pdSeverity }</Table.Cell> }
            { record.pdAction && <Table.Cell className="small-column align-left">{ record.pdAction }</Table.Cell> }
            <Table.Cell className='small-column'>
              <Icon
                name="trash alternate outline"
                className="delete-action-btn"
                onClick={()=> this.deleteIntegration(record)}
              />
            </Table.Cell>
          </Table.Row>
        )}
      )
    );
  };

  /***************************
   *       LIFECYCLE
   ***************************/
  render() {
    const { recordCollection } = this.props;

    return (
      <div className='integration-collection-wrapper'>
        <Table className="table table-bordered table-striped">
          <Table.Header className="table-header">
            { recordCollection && this.getTableHeaderView() }
          </Table.Header>
          <Table.Body className="table-body">
            { recordCollection && this.getTableView() }
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default translate(['translations'], translateOptions)(IntegrationTableView);