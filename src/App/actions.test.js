import { syncDate, SYNC_DATE } from './actions'

describe('App/actions', () => {
  it('should be create action.type SYNC_DATE', () => {
    expect(syncDate().type).toBe(SYNC_DATE)
  })

  it('should be create correct datetime response', () => {
    const action = syncDate()

    expect(action.hasOwnProperty('hour')).toBe(true)
    expect(action.hasOwnProperty('minutes')).toBe(true)
    expect(action.hasOwnProperty('seconds')).toBe(true)
  })
})
