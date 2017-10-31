import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from './index'
import { apolloWarapper } from '../testUtil'

describe('Component: App.index', () => {
  it('snapshot', () => {
    const wrapper = shallow(apolloWarapper(App))
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
