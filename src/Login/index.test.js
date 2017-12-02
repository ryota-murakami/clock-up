import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Auth0Lock from 'auth0-lock'
import { Login } from './index'

describe('<Login />', () => {
  it('snapshotが一致すること', () => {
    const clientId = 'aaaa'
    const domain = 'eeee'
    const lock = new Auth0Lock(clientId, domain)
    const wrapper = shallow(<Login lock={lock} />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
