import React from 'react'
import { shallow } from 'enzyme'
import { App } from './index'
import { createStore } from 'redux'
import { type } from '../../types/ReduxAction'
import { sel } from '../../testutil'

describe('<App />', () => {
  const setup = data =>
    shallow(<App data={data} dispatch={createStore(f => f).dispatch} />)

  describe('Logic Methods', () => {
    const instance = new App()
    describe('syncDate()', () => {
      it('should be create action.type SYNC_DATE', () => {
        expect(instance.syncDate().type).toBe(type.SYNC_DATE)
      })

      it('should be create correct datetime response', () => {
        const action = instance.syncDate()

        expect(action.hasOwnProperty('currentTime')).toBe(true)
        expect(action.currentTime.hasOwnProperty('dateObject')).toBe(true)
        expect(action.currentTime.hasOwnProperty('year')).toBe(true)
        expect(action.currentTime.hasOwnProperty('month')).toBe(true)
        expect(action.currentTime.hasOwnProperty('days')).toBe(true)
        expect(action.currentTime.hasOwnProperty('date')).toBe(true)
        expect(action.currentTime.hasOwnProperty('hour')).toBe(true)
        expect(action.currentTime.hasOwnProperty('minutes')).toBe(true)
        expect(action.currentTime.hasOwnProperty('seconds')).toBe(true)
      })
    })
  })

  describe('render', () => {
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
        const data = {
          loading: false,
          user: { foo: 'bar', isDuringClockIn: false }
        }
        it('shoud render App Page', () => {
          const wrapper = setup(data)
          expect(wrapper.find(sel('app-page')).exists()).toEqual(true)
        })

        it('ログアウトボタンが表示されること', () => {
          const wrapper = setup(data)

          expect(wrapper.find('LogoutButton').exists()).toEqual(true)
        })

        it('should be display control', () => {
          const wrapper = setup(data)

          expect(wrapper.find('Apollo(Control)').exists()).toEqual(true)
        })
      })
    })
  })
})
