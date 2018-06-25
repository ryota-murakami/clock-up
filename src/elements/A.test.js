import React from 'react'
import { shallow } from 'enzyme'

import { A } from './A'

describe('<A />', () => {
  it('should match to spapshot', () => {
    const wrapper = shallow(<A />)
    expect(wrapper).toMatchSnapshot()
  })
})
