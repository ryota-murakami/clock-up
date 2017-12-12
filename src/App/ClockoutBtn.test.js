import React from 'react'
import { shallow } from 'enzyme'
import { ClockoutBtn } from './ClockoutBtn'
import { sel } from '../testUtil'

describe('<ClockoutBtn />', () => {
  it('should be render', () => {
    const wrapper = shallow(
      <ClockoutBtn
        data={new Object()}
        mutation1={new Object()}
        mutation2={new Object()}
      />
    )

    expect(wrapper.exists()).toBe(true)
  })

  it('should be invoke recordClockoutTimeToGraphcool() when clicked', () => {
    const mockFunc = jest.fn()
    ClockoutBtn.prototype.recordClockoutTimeToGraphcool = mockFunc
    const wrapper = shallow(
      <ClockoutBtn
        data={new Object()}
        mutation1={new Object()}
        mutation2={new Object()}
      />
    )

    wrapper.find(sel('clock-out-btn')).simulate('click')

    expect(mockFunc).toBeCalled()
  })
})
