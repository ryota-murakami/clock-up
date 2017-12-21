import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Loading } from './Loading'

describe('<Loading />', () => {
  const setup = function() {
    const wrapper = shallow(<Loading />)
    return wrapper
  }

  it('should be render', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })

  it('should be match snapshot', () => {
    const wrapper = setup()

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
