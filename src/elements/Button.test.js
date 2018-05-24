import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Button } from './Button'

describe('<Button />', () => {
  it('should match to spapshot', () => {
    const wrapper = shallow(<Button />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
