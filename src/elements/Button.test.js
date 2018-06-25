import React from 'react'
import { shallow } from 'enzyme'
import { Button } from './Button'

describe('<Button />', () => {
  it('should match to spapshot', () => {
    const wrapper = shallow(<Button />)
    expect(wrapper).toMatchSnapshot()
  })
})
