import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Table, Th, Tbody, Td } from './Table'

describe('<Table />', () => {
  it('toMatchSnapshot', () => {
    const wrapper = shallow(<Table />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})

describe('<Th />', () => {
  it('toMatchSnapshot', () => {
    const wrapper = shallow(<Th />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})

describe('<Tbody />', () => {
  it('toMatchSnapshot', () => {
    const wrapper = shallow(<Tbody />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})

describe('<Td />', () => {
  it('toMatchSnapshot', () => {
    const wrapper = shallow(<Td />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
