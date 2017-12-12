import React from 'react'
import { shallow } from 'enzyme'
import History from './History'

describe('<History />', () => {
  it('should be render', () => {
    const wrapper = shallow(<History />)

    expect(wrapper.exists()).toBe(true)
  })
})
