import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { A } from './A'

describe('<A />', () => {
  it('toMatchSnapshot', () => {
    const wrapper = shallow(<A />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})