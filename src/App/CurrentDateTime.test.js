import React from 'react'
import { shallow } from 'enzyme'
import { CurrentDateTime } from './CurrentDateTime'

describe('<CurrentDateTime />', () => {
  it('should be render', () => {
    const wrapper = shallow(<CurrentDateTime />)

    expect(wrapper.exists()).toBe(true)
  })
})
