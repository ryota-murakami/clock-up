import React from 'react'
import { shallow } from 'enzyme'
import { ClockInButton } from './ClockInButton'
import { sel } from '../../../setupTests'

describe('<ClockinButton />', () => {
  const data = {
    loading: false
  }

  it('should render without error', () => {
    const wrapper = shallow(<ClockInButton data={data} />)
    expect(wrapper.exists()).toBe(true)
  })

  it('should invoke recordClockinTimeToGraphcool() when clicked', () => {
    const mockFunc = jest.fn()
    ClockInButton.prototype.gqlLogic = mockFunc
    const wrapper = shallow(<ClockInButton data={data} />)
    wrapper.find(sel('clock-in-btn')).simulate('click')
    expect(mockFunc).toBeCalled()
  })
})
