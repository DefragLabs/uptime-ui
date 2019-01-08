import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';

export default class IntegrationTableView extends Component {
  
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
        { record.service_key && <Table.HeaderCell className="extra-large-column">{t('integrations.serviceKey')}</Table.HeaderCell> }
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
            { record.service_key && <Table.Cell className="extra-large-column">{ record.service_key }</Table.Cell> }
            <Table.Cell className='small-column'>
              <Icon
                name="trash alternate outline delete-action-btn"
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
