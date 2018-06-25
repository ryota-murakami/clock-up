import React from 'react'
import { shallow } from 'enzyme'
import { Table, Th, Tbody, Td } from './Table'

describe('<Table />', () => {
  it('should match to spapshot', () => {
    const wrapper = shallow(<Table />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('<Th />', () => {
  it('should match to spapshot', () => {
    const wrapper = shallow(<Th />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('<Tbody />', () => {
  it('should match to spapshot', () => {
    const wrapper = shallow(<Tbody />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('<Td />', () => {
  it('should match to spapshot', () => {
    const wrapper = shallow(<Td />)
    expect(wrapper).toMatchSnapshot()
  })
})
