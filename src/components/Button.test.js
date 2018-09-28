import React from 'react'
import { render } from 'react-testing-library'
import { Button } from './Button'

describe('<Button />', () => {
  it('should match to spapshot', () => {
    const { container } = render(<Button />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
