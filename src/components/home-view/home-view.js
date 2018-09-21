import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEqual } from 'lodash';
import { translate } from 'react-i18next';
import { translateOptions } from '../../i18n/config';

import { Link } from 'react-router-dom';
import { fetchSampleData } from '../../actions/app-actions';

class HomeView extends Component {
  constructor() {
    super();
  }

  componentDidMount(){
    this.getData();
  }

  componentWillReceiveProps(newProps){
    if (!isEqual(newProps.sampleResponse, this.props.sampleResponse)) {
      console.log(newProps.sampleResponse);
    }
  }

  getData(){
    this.props.fetchSampleData();
  }

  render(){
    const { t } = this.props;
    return(
      <div>
        <div className="header">
          <Link to="/">Home</Link>
        </div>

        <h1>Home</h1>
        <p>{t('common.welcomeMessage')}</p>
        <button>Go to about page via redux</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sampleResponse: state.get('sampleResponse')
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchSampleData: fetchSampleData
  },dispatch)
}

export default translate(['translations'], translateOptions)(connect(mapStateToProps, mapDispatchToProps)(HomeView));