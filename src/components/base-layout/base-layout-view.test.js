import React from 'react'
import { BaseLayoutView } from './base-layout-view'
import { shallow } from 'enzyme'

import AppLoaderView from '../common/app-loader-view';


describe('BaseLayoutView', () => {
  it('renders without crashing', () => {
    expect(shallow(<BaseLayoutView />))
  })
  it('renders loader when isLoading is true', () => {
    const props = {
        isLoading: true
    }
    const wrapper = shallow(<BaseLayoutView {...props}/>)
    expect(wrapper.find(AppLoaderView).exists()).toBe(true)
  })
})
