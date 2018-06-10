import React from 'react'
import { shallow } from 'enzyme'
import { ClockinTime } from './ClockinTime'
import type { CurrentTime } from '../../types/CurrentTime'
import { parseTime } from '../../../function'

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

  const currentTime: CurrentTime = parseTime(new Date())

  it('should be error without currentTime props', () => {
    expect(() => shallow(<ClockinTime data={correctData} />)).toThrow()
  })

  it('should not error with incorrect data', () => {
    expect(() =>
      shallow(<ClockinTime data={incorrectData} currentTime={currentTime} />)
    ).toThrow()
  })

  it('should be render', () => {
    const wrapper = shallow(
      <ClockinTime data={correctData} currentTime={currentTime} />
    )
    expect(wrapper.exists()).toBe(true)
  })

  it('should formatDate() is working correct', () => {
    const wrapper = shallow(
      <ClockinTime data={correctData} currentTime={currentTime} />
    )
    expect(
      wrapper.html().includes('2:15 AM') || wrapper.html().includes('5:15 PM')
    ).toBe(true)
  })
})
