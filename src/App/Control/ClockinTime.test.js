import React from 'react'
import { shallow } from 'enzyme'
import { ClockinTime } from './ClockinTime'

describe('<ClockinTime / >', () => {
  const correctData = {
    user: {
      id: 'fwjiofjweiofjiwoj32233209jiosf',
      isDuringClockIn: false,
      clocks: [
        {
          id: 'fwjiofjweiofjiwoj32233209jiosf',
          clockIn: '2017-12-12T17:15:01.814Z',
          clockOut: '2017-12-12T17:15:02.349Z'
        }
      ]
    }
  }

  const incorrectData = {}

  it('should be render', () => {
    const wrapper = shallow(<ClockinTime data={correctData} />)

    expect(wrapper.exists()).toBe(true)
  })

  it('should formatDate() is working correct', () => {
    const wrapper = shallow(<ClockinTime data={correctData} />)

    expect(
      wrapper.html().includes('2:15 AM') || wrapper.html().includes('5:15 PM')
    ).toBe(true)
  })

  it('should not be render with incorrect data', () => {
    expect(() => shallow(<ClockinTime data={incorrectData} />)).toThrow()
  })
})
