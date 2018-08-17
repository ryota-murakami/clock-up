import React from 'react'
import { shallow } from 'enzyme'
import { ClockInButton } from './ClockInButton'

describe('<ClockinButton />', () => {
  const data = {
    loading: false
  }

  it('should render without error', () => {
    const wrapper = shallow(<ClockInButton data={data} />)
    expect(wrapper.exists()).toBe(true)
  })
})
