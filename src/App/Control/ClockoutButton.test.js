import React from 'react'
import { shallow } from 'enzyme'
import { ClockoutButton } from './ClockoutButton'
import { sel } from '../../common/testUtil'

describe('<ClockoutButton />', () => {
  it('should be render', () => {
    const wrapper = shallow(<ClockoutButton />)

    expect(wrapper.exists()).toBe(true)
  })

  it('should be invoke recordClockoutTimeToGraphcool() when clicked', () => {
    const mockFunc = jest.fn()
    ClockoutButton.prototype.gqlLogic = mockFunc
    const wrapper = shallow(<ClockoutButton />)

    wrapper.find(sel('clock-out-btn')).simulate('click')

    expect(mockFunc).toBeCalled()
  })
})
