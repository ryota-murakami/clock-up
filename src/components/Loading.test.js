import React from 'react'
import { shallow } from 'enzyme'
import { Loading } from './Loading'

describe('<Loading />', () => {
  it('正しくレンダリングされること', () => {
    const wrapper = shallow(<Loading />)
    expect(wrapper.html()).toEqual('<div>Loading</div>')
  })
})
