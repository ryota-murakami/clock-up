import React from 'react'
import { shallow } from 'enzyme'
import { InTime } from './InTime'
import type { CurrentTime } from '../../types/CurrentTime'
import { parseTime } from '../../../functions'

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

  it('should error without currentTime props', () => {
    expect(() => shallow(<InTime data={correctData} />)).toThrow()
  })

  it('should not error with incorrect data', () => {
    expect(() =>
      shallow(<InTime data={incorrectData} currentTime={currentTime} />)
    ).toThrow()
  })

  it('should render without error', () => {
    const wrapper = shallow(
      <InTime data={correctData} currentTime={currentTime} />
    )
    expect(wrapper.exists()).toBe(true)
  })

  it('should formatDate() is working correct', () => {
    const wrapper = shallow(
      <InTime data={correctData} currentTime={currentTime} />
    )
    expect(
      wrapper.html().includes('2:15 AM') || wrapper.html().includes('5:15 PM')
    ).toBe(true)
  })
})
