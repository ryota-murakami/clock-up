import React from 'react'
import { shallow } from 'enzyme'
import { ClockoutButton } from './ClockoutButton'
import { sel } from '../../common/testutil'

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

  it('should be render', () => {
    const wrapper = shallow(<ClockoutButton data={data} />)

    expect(wrapper.exists()).toBe(true)
  })

  it('should be invoke recordClockoutTimeToGraphcool() when clicked', () => {
    const mockFunc = jest.fn()
    ClockoutButton.prototype.gqlLogic = mockFunc
    const wrapper = shallow(<ClockoutButton data={data} />)

    wrapper.find(sel('clock-out-btn')).simulate('click')

    expect(mockFunc).toBeCalled()
  })
})
