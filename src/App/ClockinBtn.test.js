import React from 'react'
import { shallow } from 'enzyme'
import { ClockinBtn } from './ClockinBtn'
import { sel } from '../testUtil'

describe('<ClockinBtn />', () => {
  it('should be render', () => {
    const wrapper = shallow(<ClockinBtn />)

    expect(wrapper.exists()).toBe(true)
  })

  it('should be invoke recordClockinTimeToGraphcool() when clicked', () => {
    const mockFunc = jest.fn()
    ClockinBtn.prototype.recordClockinTimeToGraphcool = mockFunc
    const wrapper = shallow(<ClockinBtn />)

    wrapper.find(sel('clock-in-btn')).simulate('click')

    expect(mockFunc).toBeCalled()
  })
})
