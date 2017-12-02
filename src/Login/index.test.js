import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Login } from './index'

describe('<Login />', () => {
  it('snapshotが一致すること', () => {
    const wrapper = shallow(<Login clientId="aaaa" domain="eeee" />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
