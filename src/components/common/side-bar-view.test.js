import React from 'react'
import SideBarView from './side-bar-view'
import { shallow } from 'enzyme'

import { SIDEBAR_MENUS } from '../../constants/menu-collection';

describe('SideBar', () => {
  it('renders without crashing', () => {
    const props = {
      location: {pathname: ''}
    }
    expect(shallow(<SideBarView {...props}/>))
  })
  it('isUrlActive function works correctly', () => {
    const testUrl = SIDEBAR_MENUS[0].url
    const props = {
      location: {pathname: testUrl}
    }
    const wrapper = shallow(<SideBarView {...props}/>)
    expect(wrapper.instance().isUrlActive(testUrl)).toBe(true)
  })
  it('Menu option is highlighted correctly based on url', () => {
    const testUrl = SIDEBAR_MENUS[0].url
    const props = {
      location: {pathname: testUrl}
    }
    const wrapper = shallow(<SideBarView {...props}/>)
    expect(wrapper.find({to: testUrl}).hasClass('active')).toBe(true)
  })


})
