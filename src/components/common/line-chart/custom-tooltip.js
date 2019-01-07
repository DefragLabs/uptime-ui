import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';

class CustomTooltipView extends Component {

  render () {
    const { active } = this.props;
    
    if(active){
      const { payload, t } = this.props;
      
      return (
        <Card className="custom-tooltip">
          <div className="time">
            <div className="key">{t('common.time')} -&nbsp;</div>
            <div className="value">
              {moment(payload[0].payload.time).format('lll')}
            </div>
          </div>
          <div className="response-time">
            <div className="key">{t('common.responseTime')} -&nbsp;</div>
            <div className="value">
              {payload[0].payload.responseTime}
            </div>
          </div>
          <div className="status">
            <div className="key">{t('common.status')} - &nbsp;</div>
            <div className="value">
              {payload[0].payload.status} ({payload[0].payload.statusDescription})
            </div>
          </div>
        </Card>
      );
    }

    return null;
  }
}

export default CustomTooltipView;