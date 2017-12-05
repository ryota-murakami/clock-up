import React from 'react'
import { shallow } from 'enzyme'
import { sel } from '../testUtil'
import { App } from './index'

describe('<App />', () => {
  describe('data.loading == true', () => {
    function setup() {
      const data = { loading: true }
      const wrapper = shallow(<App data={data} />)

      return wrapper
    }

    it('[data]propsのみの受け渡しでErrorなくレンダリングされること', () => {
      expect(() => setup()).not.toThrow()
    })

    it('loadingが表示されること', () => {
      const wrapper = setup()

      expect(wrapper.find('Loading').exists()).toEqual(true)
    })
  })
  describe('data.loading == false', () => {
    function setup() {
      const data = { loading: false, user: null }
      const wrapper = shallow(<App data={data} />)

      return wrapper
    }

    it('[data]propsのみの受け渡しでErrorなくレンダリングされること', () => {
      expect(() => setup()).not.toThrow()
    })

    it('loadingが表示されないこと', () => {
      const wrapper = setup()

      expect(wrapper.find('Loading').exists()).toEqual(false)
    })

    describe('isAuthenticated() == false', () => {
      it('ログイン画面へリダイレクトされること', () => {
        const wrapper = setup()

        expect(wrapper.find('Redirect').exists()).toEqual(true)
        expect(wrapper.find('Redirect').props()).toEqual({
          to: '/login',
          push: false
        })
      })
    })

    describe('isAuthenticated() == true', () => {
      function setup() {
        const data = { loading: false, user: { foo: 'bar' } }
        const wrapper = shallow(<App data={data} />)

        return wrapper
      }

      it('メイン画面が表示されること', () => {
        const wrapper = setup()

        expect(wrapper.find(sel('main')).exists()).toEqual(true)
      })

      it('ログアウトボタンが表示されること', () => {
        const wrapper = setup()

        expect(wrapper.find(sel('logout-btn')).exists()).toEqual(true)
      })
    })
  })
})
