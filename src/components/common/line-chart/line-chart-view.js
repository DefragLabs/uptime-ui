import React, { Component } from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label} from 'recharts';
import CustomXAxisTickView from './custom-xAxis-tick';
import CustomTooltipView from './custom-tooltip';

export default class LineChartView extends Component {

  render() {
    const { monitorResults } = this.props.data;
    const { t } = this.props;

    return(
      <AreaChart
        width={900}
        height={250}
        data={monitorResults}
        margin={{top: 20, right: 30, left: 10, bottom: 10}}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" tick={<CustomXAxisTickView />}>
          <Label
            y="1em"
            value={t('uptime.date')}
            offset={1}
            position="insideBottom"
          />
        </XAxis>
        <YAxis dataKey="responseTime">
          <Label
            value={t('uptime.responseTime')}
            angle="-90"
            position='insideBottomLeft'
          />
        </YAxis>
        <Tooltip
          {...this.props}
          content={<CustomTooltipView/>}
        />
        <Area
          type='monotone'
          dataKey='responseTime'
          stroke='#82ca9d'
          fill='#82ca9d'
        />
      </AreaChart>
    )
  }

}