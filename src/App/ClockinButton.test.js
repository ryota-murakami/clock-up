import React from 'react'
import { shallow } from 'enzyme'
import { ClockinButton } from './ClockinButton'
import { sel } from '../testUtil'

describe('<ClockinButton />', () => {
  it('should be render', () => {
    const wrapper = shallow(<ClockinButton />)

    expect(wrapper.exists()).toBe(true)
  })

  it('should be invoke recordClockinTimeToGraphcool() when clicked', () => {
    const mockFunc = jest.fn()
    ClockinButton.prototype.recordClockinTimeToGraphcool = mockFunc
    const wrapper = shallow(<ClockinButton />)

    wrapper.find(sel('clock-in-btn')).simulate('click')

    expect(mockFunc).toBeCalled()
  })
})
