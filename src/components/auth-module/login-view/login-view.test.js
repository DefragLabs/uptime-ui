import React from 'react'
import { LoginViewComponent } from './login-view'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'

describe('Login', () => {
  it('renders without crashing', () => {
    expect(mount(<MemoryRouter><LoginViewComponent /></MemoryRouter>))
  })
})
