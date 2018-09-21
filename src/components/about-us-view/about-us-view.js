import React, {Component} from 'react';
import { connect } from 'react-redux';

class AboutView extends Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div>
        <h1>About Page</h1>
        <p>Did you get here via Redux?</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps
)(AboutView);