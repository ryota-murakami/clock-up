import appReducer from './reducer'
import { SYNC_DATE } from './actions'

describe('App/reducers', () => {
  it('should be return the initial state', () => {
    const res = appReducer(undefined, {})

    expect(typeof res === 'object').toBe(true)
    expect(res.hasOwnProperty('hour')).toBe(true)
    expect(res.hasOwnProperty('minutes')).toBe(true)
    expect(res.hasOwnProperty('seconds')).toBe(true)
  })

  it('should be correct work SYNC_DATE', () => {
    const action = {
      type: SYNC_DATE,
      hour: 6,
      minutes: 42,
      seconds: 13
    }
    const res = appReducer(undefined, action)
    const expectedState = {
      hour: 6,
      minutes: 42,
      seconds: 13
    }

    expect(res).toEqual(expectedState)
  })
})
