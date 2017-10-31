import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import LoginAuth0 from './LoginAuth0'

describe('Component: LoginAuth0', () => {
  it('snapshot', () => {
    const wrapper = shallow(<LoginAuth0 />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
