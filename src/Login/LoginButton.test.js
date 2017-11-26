import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { LoginButton } from './LoginButton'
import Auth0Lock from 'auth0-lock'

describe('Component: LoginButton', () => {
  let wrapper

  beforeAll(() => {
    const lock = new Auth0Lock('story', 'book')
    wrapper = shallow(<LoginButton lock={lock} />)
  })

  it('snapshotが正しいこと', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('Auth0オブジェクトのauthenticatedリスナーにイベントがセットされていること', () => {
    // _eventsオブジェクトにキー名がauthenticatedのfunctionがセットされていること
    const events = wrapper.instance().props.lock._events
    expect(Object.prototype.hasOwnProperty.call(events, 'authenticated')).toBe(
      true
    )
    expect(typeof events.authenticated).toEqual('function')
  })

  it('クリックしたらshowModal()メソッドが起動すること', () => {})
})
