import { syncDate, SYNC_DATE } from './actions'

describe('App/actions', () => {
  it('should be create action.type SYNC_DATE', () => {
    expect(syncDate().type).toBe(SYNC_DATE)
  })

  it('should be create correct datetime response', () => {
    const action = syncDate()

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
