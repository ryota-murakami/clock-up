import React from 'react'
import { render } from 'react-testing-library'
import { Table, Th, Tbody, Td } from './Table'

describe('<Table />', () => {
  it('should match to spapshot', () => {
    const { container } = render(<Table />)
    expect(container.firstChild).toMatchSnapshot()
  })
})

describe('<Th />', () => {
  it('should match to spapshot', () => {
    const { container } = render(<Th />)
    expect(container.firstChild).toMatchSnapshot()
  })
})

describe('<Tbody />', () => {
  it('should match to spapshot', () => {
    const { container } = render(<Tbody />)
    expect(container.firstChild).toMatchSnapshot()
  })
})

describe('<Td />', () => {
  it('should match to spapshot', () => {
    const { container } = render(<Td />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
