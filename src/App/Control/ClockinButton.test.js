import React from 'react'
import { shallow } from 'enzyme'
import { ClockinButton } from './ClockinButton'
import { sel } from '../../common/testUtil'

describe('<ClockinButton />', () => {
  const data = {
    loading: false
  }

  it('should be render', () => {
    const wrapper = shallow(<ClockinButton data={data} />)

    expect(wrapper.exists()).toBe(true)
  })

  it('should be invoke recordClockinTimeToGraphcool() when clicked', () => {
    const mockFunc = jest.fn()
    ClockinButton.prototype.gqlLogic = mockFunc
    const wrapper = shallow(<ClockinButton data={data} />)

    wrapper.find(sel('clock-in-btn')).simulate('click')

    expect(mockFunc).toBeCalled()
  })
})
