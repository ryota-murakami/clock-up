import React from 'react'
import { shallow } from 'enzyme'
import { Loading } from './Loading'

describe('<Loading />', () => {
  const setup = function() {
    const wrapper = shallow(<Loading />)
    return wrapper
  }

  it('should render', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })

  it('should match snapshot', () => {
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
  })
})
