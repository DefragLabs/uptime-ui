import React, { Component } from 'react';

export default class EmptyStateView extends Component {

  render(){
    const { message } = this.props;
    return(
      <div className="empty-state-view">{message}</div>
    )
  }

}