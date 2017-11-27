import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { LoginButton } from './LoginButton'
import Auth0Lock from 'auth0-lock'
import { sel } from '../testUtil'

describe('Component: LoginButton', () => {
  function setup() {
    const lock = new Auth0Lock('story', 'book')
    const wrapper = shallow(<LoginButton lock={lock} />)

    return wrapper
  }

  it('snapshotが正しいこと', () => {
    const wrapper = setup()
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('Auth0オブジェクトのauthenticatedリスナーにイベントがセットされていること', () => {
    // _eventsオブジェクトにキー名がauthenticatedのfunctionがセットされていること
    const wrapper = setup()
    const events = wrapper.instance().props.lock._events
    expect(Object.prototype.hasOwnProperty.call(events, 'authenticated')).toBe(
      true
    )
    expect(typeof events.authenticated).toEqual('function')
  })

  it('クリックしたらshowLogin()メソッドが起動すること', () => {
    // LoginBtnのshowLogin()メソッドをモックする
    const lock = new Auth0Lock('story', 'book')
    const mockFunction = jest.fn()
    LoginButton.prototype.showLogin = mockFunction
    const wrapper = shallow(<LoginButton lock={lock} />)

    wrapper.find(sel('login-btn')).simulate('click')

    expect(mockFunction).toBeCalled()
  })
})
