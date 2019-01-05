import React, { Component } from 'react';
import moment from 'moment';

class CustomizedXAxisTickView extends Component {
  render () {
    const {x, y, payload} = this.props;
		
   	return (
    	<g transform={`translate(${x},${y})`}>
        <text x={40} y={0} dy={10} textAnchor="end" fill="#666">
          {moment(payload.value).format('L')}
        </text>
      </g>
    );
  }
}

export default CustomizedXAxisTickView;