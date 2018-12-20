import React, { Component } from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label} from 'recharts';

class LineChartView extends Component {
  /***************************
   *       CONSTRUCTOR
   ***************************/
  constructor(){
    super();
    this.state = {}
  }

  /***************************
   *         METHODS
   ***************************/
  
  /***************************
   *         LIFECYCLE
   ***************************/
  render() {
    const { monitorResults } = this.props.data;

    return(
      <AreaChart
        width={900}
        height={250}
        data={monitorResults}
        margin={{top: 20, right: 30, left: 10, bottom: 10}}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time">
          <Label value="Pages of my website" offset={1} position="insideBottom" />
        </XAxis>
        <YAxis dataKey="responseTime" tickFormatter="test">
          <Label
            value="Response time in milliseconds"
            angle="-90"
            position='insideBottomLeft'
          />
        </YAxis>
        <Tooltip />
        <Area type='monotone' dataKey='responseTime' stroke='#82ca9d' fill='#82ca9d' />
      </AreaChart>
    )
  }

}

export default LineChartView;