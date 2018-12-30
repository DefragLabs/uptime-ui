import React, { Component } from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label} from 'recharts';
import CustomizedXAxisTickView from './customized-xAxis-tick';

export default class LineChartView extends Component {

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
        <XAxis dataKey="time" tick={<CustomizedXAxisTickView />}>
          <Label y="1em" value="Pages of my website" offset={1} position="insideBottom" />
        </XAxis>
        <YAxis dataKey="responseTime">
          <Label
            value="Response time (millisecond)"
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