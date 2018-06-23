import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { LoginButton } from './LoginButton'
import Auth0Lock from 'auth0-lock'
import { sel } from '../../testutil'

describe('<LoginButton />', () => {
  function setup() {
    const lock = new Auth0Lock('story', 'book')
    const wrapper = shallow(<LoginButton lock={lock} />)
    return wrapper
  }

  it('should match to snapshot', () => {
    const wrapper = setup()
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('sould authenticated eventlistener is set of Auth0 SDK Object', () => {
    const wrapper = setup()
    const events = wrapper.instance().props.lock._events
    expect(Object.prototype.hasOwnProperty.call(events, 'authenticated')).toBe(
      true
    )
    expect(typeof events.authenticated).toEqual('function')
  })

  it('should fire showLogin() when clicked', () => {
    // mock of LoginBtn.showLogin()
    const lock = new Auth0Lock('story', 'book')
    const mockFunc = jest.fn()
    LoginButton.prototype.showAuth0LoginModal = mockFunc
    const wrapper = shallow(<LoginButton lock={lock} />)
    wrapper.find(sel('login-btn')).simulate('click')
    expect(mockFunc).toBeCalled()
  })
})
