import React from 'react'
import { UpTimeView } from './uptime-view'
import { shallow } from 'enzyme'
import {t, noop, mockFunc} from '../../utils/test-utils'

describe('UpTimeView', () => {
  it('renders without crashing', () => {
    const props = {
        t : t,
        requestMonitoringUrls: noop
    }
    expect(shallow(<UpTimeView {...props}/>))
  })

  it('opens modal on click of add url', () => {
    const props = {
        t : t,
        requestMonitoringUrls: noop
    }
    const wrapper = shallow(<UpTimeView {...props}/>)
    wrapper.instance().showModal = jest.fn()
    wrapper.instance().forceUpdate()
    wrapper.find('[data-test-id="add-button"]').simulate('click')
    expect(wrapper.instance().showModal).toHaveBeenCalled()
  })

  it('calls deleteMonitoringUrl', () => {
    const props = {
      t : t,
      requestMonitoringUrls: noop,
      requestDeleteMonitoringUrls: mockFunc
    }
    const event = {
      stopPropagation: noop,
      currentTarget: {
        dataset: {id: '123'}
      }
    }
    const wrapper = shallow(<UpTimeView {...props}/>)
    wrapper.instance().deleteMonitoringUrl(event)
    expect(wrapper.instance().props.requestDeleteMonitoringUrls).toHaveBeenCalledWith('123')
  })

  it('calls handleEdit', () => {
    const props = {
      t : t,
      requestMonitoringUrls: noop,
      monitoringURLs: { monitoringURLs : [{id: '123'}] }
    }
    const event = {
      stopPropagation: noop,
      currentTarget: {
        dataset: {id: '123'}
      }
    }
    const wrapper = shallow(<UpTimeView {...props}/>)
    wrapper.instance().showModal = mockFunc
    wrapper.instance().forceUpdate()
    wrapper.instance().handleEdit(event)
    expect(wrapper.instance().showModal).toHaveBeenCalledWith({id: '123'})
  })

  it('calls handleUpdateUrl', () => {
    const props = {
      t : t,
      requestMonitoringUrls: noop,
      requestUpdateMonitoringUrls: mockFunc
    }
    const wrapper = shallow(<UpTimeView {...props}/>)
    wrapper.instance().handleUpdateUrl({frequency: 1}, 123)
    expect(wrapper.instance().props.requestUpdateMonitoringUrls).toHaveBeenCalledWith({id: 123, frequency: 1})
  })

  it('calls handleUpdateUrl', () => {
    const props = {
      t : t,
      requestMonitoringUrls: noop,
      requestUpdateMonitoringUrls: mockFunc
    }
    const wrapper = shallow(<UpTimeView {...props}/>)
    wrapper.instance().handleUpdateUrl({frequency: 1}, 123)
    expect(wrapper.instance().props.requestUpdateMonitoringUrls).toHaveBeenCalledWith({id: 123, frequency: 1})
  })

  it('calls showModal', () => {
    const props = {
      t : t,
      requestMonitoringUrls: noop
    }
    const wrapper = shallow(<UpTimeView {...props}/>)
    wrapper.instance().showModal({id: 123})
    expect(wrapper.state('isModalVisible')).toBe(true)
    expect(wrapper.state('editDetails').id).toBe(123)
  })

  it('calls hideModal', () => {
    const props = {
      t : t,
      requestMonitoringUrls: noop
    }
    const wrapper = shallow(<UpTimeView {...props}/>)
    wrapper.setState({ isModalVisible: true });
    wrapper.instance().hideModal()
    expect(wrapper.state('isModalVisible')).toBe(false)
  })

})
