import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';

export default class IntegrationTableView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  getTableHeaderView() {
    const { recordCollection } = this.props;
    const record = recordCollection[0];
    const valueColumn = {
      width: '80%'
    }
    const actionColumn = {
      width: '20%',
      textAlign: 'center'
    }
    return (
      <Table.Row className="table-row">
        { record.email && <Table.HeaderCell style={valueColumn}>{t('integrations.email')}</Table.HeaderCell> }
        { record.webhookURL && <Table.HeaderCell style={valueColumn}>{t('common.webhookURL')}</Table.HeaderCell> }
        { record.service_key && <Table.HeaderCell style={valueColumn}>{t('integrations.serviceKey')}</Table.HeaderCell> }
        <Table.HeaderCell style={actionColumn}>{t('common.actions')}</Table.HeaderCell>
      </Table.Row>
    )
  }

  getTableView() {
    const {recordCollection} = this.props;
    const deleteBtnStyles = {
      color: '#db2547',
      cursor: 'pointer'
    };
    const workBreakStyles = {
      wordBreak: 'break-all',
      width: '80%'
    }
    const actionCell = {
      width: '20%',
      textAlign: 'center'
    }
    return (
      recordCollection.map((record) => {
        return (
          <Table.Row className="table-row" key={record.id}>
            { record.email && <Table.Cell style={workBreakStyles}>{ record.email }</Table.Cell> }
            { record.webhookURL && <Table.Cell style={workBreakStyles}>{ record.webhookURL }</Table.Cell> }
            { record.service_key && <Table.Cell style={workBreakStyles}>{ record.service_key }</Table.Cell> }
            <Table.Cell style={actionCell} className='text-center'>
              <Icon
                name="trash alternate outline"
                style={deleteBtnStyles}
                onClick={()=> this.deleteIntegration(record)}
              />
            </Table.Cell>
          </Table.Row>
        )}
      )
    );
  };

  deleteIntegration(integration) {
    let params = {
      id: integration.id
    }
    this.props.integrationDeleteCallback(params)
  }

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
