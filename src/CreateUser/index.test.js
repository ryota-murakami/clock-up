import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SignUp from './index'
import { apolloWarapper } from '../testUtil'

describe('Component: CreateUser.index', () => {
  it('snapshot', () => {
    const wrapper = shallow(apolloWarapper(SignUp))
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
