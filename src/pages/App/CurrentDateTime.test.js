import React from 'react'
import { shallow } from 'enzyme'
import { CurrentDateTime } from './CurrentDateTime'
import type { CurrentTime } from '../types/CurrentTime'
import { parseTime } from '../../function'

describe('<CurrentDateTime />', () => {
  const currentTime: CurrentTime = parseTime(new Date())

  it('should render', () => {
    const wrapper = shallow(<CurrentDateTime currentTime={currentTime} />)
    expect(wrapper.exists()).toBe(true)
  })

  it('should error without currentTime props', () => {
    expect(() => shallow(<CurrentDateTime />)).toThrow()
  })
})
