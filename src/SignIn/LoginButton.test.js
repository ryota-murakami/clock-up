import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import LoginButton from './LoginButton'

describe('Component: LoginButton', () => {
  it('snapshot', () => {
    const wrapper = shallow(<LoginButton />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
