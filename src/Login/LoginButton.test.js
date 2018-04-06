import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { LoginButton } from './LoginButton'
import Auth0Lock from 'auth0-lock'
import { sel } from '../common/testutil'

describe('<LoginButton />', () => {
  function setup() {
    const lock = new Auth0Lock('story', 'book')
    const wrapper = shallow(<LoginButton lock={lock} />)

    return wrapper
  }

  it('snapshotが一致すること', () => {
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
    const mockFunc = jest.fn()
    LoginButton.prototype.showAuth0LoginModal = mockFunc
    const wrapper = shallow(<LoginButton lock={lock} />)

    wrapper.find(sel('login-btn')).simulate('click')

    expect(mockFunc).toBeCalled()
  })
})
