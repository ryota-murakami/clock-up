import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Button } from './Button'

describe('<Button />', () => {
  it('toMatchSnapshot', () => {
    const wrapper = shallow(<Button />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
