import React from 'react'
import { shallow } from 'enzyme'
import { CurrentDateTime } from './CurrentDateTime'
import type { CurrentTime } from '../types/CurrentTime'
import { parseTime } from '../../function'

describe('<CurrentDateTime />', () => {
  const currentTime: CurrentTime = parseTime(new Date())

  it('should be error without currentTime props', () => {
    expect(() => shallow(<CurrentDateTime />)).toThrow()
  })

  it('should be render', () => {
    const wrapper = shallow(<CurrentDateTime currentTime={currentTime} />)

    expect(wrapper.exists()).toBe(true)
  })
})
