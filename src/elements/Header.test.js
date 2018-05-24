import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Header } from './Header'

describe('<Header />', () => {
  it('should match to spapshot', () => {
    const wrapper = shallow(<Header />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
