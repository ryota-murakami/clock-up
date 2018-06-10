import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Table, Th, Tbody, Td } from './Table'

describe('<Table />', () => {
  it('should match to spapshot', () => {
    const wrapper = shallow(<Table />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})

describe('<Th />', () => {
  it('should match to spapshot', () => {
    const wrapper = shallow(<Th />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})

describe('<Tbody />', () => {
  it('should match to spapshot', () => {
    const wrapper = shallow(<Tbody />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})

describe('<Td />', () => {
  it('should match to spapshot', () => {
    const wrapper = shallow(<Td />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
