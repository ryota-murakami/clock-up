import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SignIn from './index'

describe('Component: SignIn', () => {
  it('snapshot', () => {
    const wrapper = shallow(<SignIn />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
