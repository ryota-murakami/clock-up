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
      it('should render only passing [data]props without error', () => {
        const data = { loading: true }
        expect(() => setup(data)).not.toThrow()
      })

      it('should displayed Loading', () => {
        const data = { loading: true }
        const wrapper = setup(data)
        expect(wrapper.find(sel('app-loading')).exists()).toEqual(true)
      })
    })
    describe('data.loading == false', () => {
      it('should render only passing [data]props without error', () => {
        const data = { loading: false, user: null }
        expect(() => setup(data)).not.toThrow()
      })

      it('should not dispalyed Loading', () => {
        const data = { loading: false, user: null }
        const wrapper = setup(data)
        expect(wrapper.find(sel('app-loading')).exists()).toEqual(false)
      })

      describe('isAuthenticated() == false', () => {
        it('should redirected Login page', () => {
          const data = { loading: false, user: null }
          const wrapper = setup(data)
          expect(wrapper.find(sel('app-redirect')).exists()).toEqual(true)
          expect(wrapper.find(sel('app-redirect')).props()).toEqual({
            to: '/login',
            push: false,
            'enzyme-testid': 'app-redirect'
          })
        })
      })

      describe('isAuthenticated() == true', () => {
        const data = {
          loading: false,
          user: { foo: 'bar', isDuringClockIn: false }
        }
        it('should render App Page', () => {
          const wrapper = setup(data)
          expect(wrapper.find(sel('app-page')).exists()).toEqual(true)
        })

        it('should displayed LogoutButton', () => {
          const wrapper = setup(data)
          expect(wrapper.find('LogoutButton').exists()).toEqual(true)
        })

        it('should displayed control', () => {
          const wrapper = setup(data)
          expect(wrapper.find('Apollo(Control)').exists()).toEqual(true)
        })
      })
    })
  })
})
