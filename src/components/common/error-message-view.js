import React, { Component } from 'react';

export default class ErrorMessageView extends Component {

  render(){
    return(
      <div className='error-message-view'>{this.props.error}</div>
    )
  }

}