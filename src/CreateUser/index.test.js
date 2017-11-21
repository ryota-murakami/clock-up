import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CreateUser from './index'
import { apolloWarapper } from '../testUtil'

describe('Component: CreateUser.index', () => {
  it('snapshot', () => {
    const wrapper = shallow(apolloWarapper(CreateUser))
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
