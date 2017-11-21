import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Login from './index'

describe('Component: Login', () => {
  it('snapshot', () => {
    const wrapper = shallow(<Login />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
