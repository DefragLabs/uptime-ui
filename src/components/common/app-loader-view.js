import React, { Component } from 'react';

export default class AppLoaderView extends Component {

  render(){
    return(
      <div className="loader-wrapper">
        <div className="loader">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
          <div className="bar4"></div>
          <div className="bar5"></div>
          <div className="bar6"></div>
        </div>
      </div>
    )
  }

}