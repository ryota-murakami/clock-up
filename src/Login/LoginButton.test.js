import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { LoginButton } from './LoginButton'
import Auth0Lock from 'auth0-lock'

describe('Component: LoginButton', () => {
  it('snapshotが正しいこと', () => {
    const lock = new Auth0Lock('story', 'book')
    const wrapper = shallow(<LoginButton lock={lock} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('componentDidMount()でlocl.on()がセットアップされrこと', () => {})
  it('クリックしたらshowModal()メソッドが起動すること', () => {})
})
