import React from 'react'
import { shallow } from 'enzyme'
import { ClockOutButton } from './ClockOutButton'

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
    const wrapper = shallow(<ClockOutButton data={data} />)
    expect(wrapper.exists()).toBe(true)
  })
})
