import React from 'react'
import { shallow } from 'enzyme'
import Auth0Lock from 'auth0-lock'
import { Login } from './index'

describe('<Login />', () => {
  function setup() {
    const clientId = 'aaaa'
    const domain = 'eeee'
    const lock = new Auth0Lock(clientId, domain)
    const wrapper = shallow(<Login lock={lock} />)
    return wrapper
  }

  it('shoud render only passing [lock]props without error', () => {
    expect(() => setup()).not.toThrow()
  })
})
