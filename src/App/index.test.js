import React from 'react'
import { shallow } from 'enzyme'
import { sel } from '../testUtil'
import { App } from './index'

describe('<App />', () => {
  function setup(data) {
    const wrapper = shallow(<App data={data} />)

    return wrapper
  }

  describe('data.loading == true', () => {
    it('[data]propsのみの受け渡しでErrorなくレンダリングされること', () => {
      const data = { loading: true }

      expect(() => setup(data)).not.toThrow()
    })

    it('loadingが表示されること', () => {
      const data = { loading: true }
      const wrapper = setup(data)

      expect(wrapper.find('Loading').exists()).toEqual(true)
    })
  })
  describe('data.loading == false', () => {
    it('[data]propsのみの受け渡しでErrorなくレンダリングされること', () => {
      const data = { loading: false, user: null }

      expect(() => setup(data)).not.toThrow()
    })

    it('loadingが表示されないこと', () => {
      const data = { loading: false, user: null }
      const wrapper = setup(data)

      expect(wrapper.find('Loading').exists()).toEqual(false)
    })

    describe('isAuthenticated() == false', () => {
      it('ログイン画面へリダイレクトされること', () => {
        const data = { loading: false, user: null }
        const wrapper = setup(data)

        expect(wrapper.find('Redirect').exists()).toEqual(true)
        expect(wrapper.find('Redirect').props()).toEqual({
          to: '/login',
          push: false
        })
      })
    })

    describe('isAuthenticated() == true', () => {
      it('メイン画面が表示されること', () => {
        const data = {
          loading: false,
          user: { foo: 'bar', isDuringClockIn: false }
        }
        const wrapper = setup(data)

        expect(wrapper.find(sel('main')).exists()).toEqual(true)
      })

      it('ログアウトボタンが表示されること', () => {
        const data = {
          loading: false,
          user: { foo: 'bar', isDuringClockIn: false }
        }
        const wrapper = setup(data)

        expect(wrapper.find(sel('logout-btn')).exists()).toEqual(true)
      })
    })
  })
})
