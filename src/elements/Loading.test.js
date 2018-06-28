import React from 'react'
import { render } from 'react-testing-library'
import { Loading } from './Loading'

describe('<Loading />', () => {
  it('should match snapshot', () => {
    const { container } = render(<Loading />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
