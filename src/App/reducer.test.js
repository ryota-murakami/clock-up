// @flow
import appReducer from './reducer'
import { SYNC_DATE } from './actions'
import type { ReduxState } from '../types/ReduxState'

describe('App/reducers', () => {
  it('should be return the initial state', () => {
    const res: ReduxState = appReducer(undefined, {})

    expect(typeof res === 'object').toBe(true)
    expect(res.hasOwnProperty('currentTime')).toBe(true)
    expect(res.currentTime.hasOwnProperty('year')).toBe(true)
    expect(res.currentTime.hasOwnProperty('month')).toBe(true)
    expect(res.currentTime.hasOwnProperty('days')).toBe(true)
    expect(res.currentTime.hasOwnProperty('date')).toBe(true)
    expect(res.currentTime.hasOwnProperty('hour')).toBe(true)
    expect(res.currentTime.hasOwnProperty('minutes')).toBe(true)
    expect(res.currentTime.hasOwnProperty('seconds')).toBe(true)
  })

  it('should be correct work SYNC_DATE', () => {
    const action = {
      type: SYNC_DATE,
      currentTime: {
        dateObject: {},
        year: '2018',
        month: 'January',
        days: 'Wednesday',
        date: '30',
        hour: '6',
        minutes: '42',
        seconds: '13'
      }
    }
    const res = appReducer(undefined, action)
    const expectedState = {
      currentTime: {
        dateObject: {},
        year: '2018',
        month: 'January',
        days: 'Wednesday',
        date: '30',
        hour: '6',
        minutes: '42',
        seconds: '13'
      }
    }

    expect(res).toEqual(expectedState)
  })
})
