import React from 'react'
import { shallow } from 'enzyme'
import { LogoutButton } from './LogoutButton'

describe('<LoginButton / >', () => {
  it('should render without error', () => {
    const wrapper = shallow(<LogoutButton />)
    expect(wrapper.exists()).toBe(true)
  })
})
