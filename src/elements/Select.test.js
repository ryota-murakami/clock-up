import React from 'react'
import { render } from 'react-testing-library'
import { Select } from './Select'

describe('<Select />', () => {
  it('should match to spapshot', () => {
    const { container } = render(
      <Select>
        <option value="1">1</option>
      </Select>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
