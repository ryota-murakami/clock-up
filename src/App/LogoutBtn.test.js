import React from 'react'
import { shallow } from 'enzyme'
import { LogoutBtn } from './LogoutBtn'

describe('<LoginBtn / >', () => {
  it('should be render', () => {
    const wrapper = shallow(<LogoutBtn />)
    expect(wrapper.exists()).toBe(true)
  })
})
