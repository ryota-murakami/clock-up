import React from 'react'
import { shallow } from 'enzyme'
import { ClockoutButton } from './ClockoutButton'
import { sel } from '../../../setupTests'

describe('<ClockoutButton />', () => {
  const data = {
    user: {
      id: 'id',
      clocks: [
        {
          id: 'id'
        }
      ]
    },
    loading: false
  }

  it('should render without error', () => {
    const wrapper = shallow(<ClockoutButton data={data} />)
    expect(wrapper.exists()).toBe(true)
  })

  it('should invoke recordClockoutTimeToGraphcool() when clicked', () => {
    const mockFunc = jest.fn()
    ClockoutButton.prototype.gqlLogic = mockFunc
    const wrapper = shallow(<ClockoutButton data={data} />)
    wrapper.find(sel('clock-out-btn')).simulate('click')
    expect(mockFunc).toBeCalled()
  })
})
