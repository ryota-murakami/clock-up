import React from 'react'
import { render } from 'react-testing-library'

import { A } from './A'

describe('<A />', () => {
  it('should match to spapshot', () => {
    const { container } = render(<A />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
