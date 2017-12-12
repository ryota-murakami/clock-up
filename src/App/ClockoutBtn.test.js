import React from 'react'
import { shallow } from 'enzyme'
import { ClockoutBtn } from './ClockoutBtn'
import { sel } from '../testUtil'

describe('<ClockoutBtn />', () => {
  it('should be render', () => {
    const wrapper = shallow(<ClockoutBtn />)

    expect(wrapper.exists()).toBe(true)
  })

  it('should be invoke recordClockoutTimeToGraphcool() when clicked', () => {
    const mockFunc = jest.fn()
    ClockoutBtn.prototype.recordClockoutTimeToGraphcool = mockFunc
    const wrapper = shallow(<ClockoutBtn />)

    wrapper.find(sel('clock-out-btn')).simulate('click')

    expect(mockFunc).toBeCalled()
  })
})
