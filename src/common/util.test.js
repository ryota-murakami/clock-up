import { parseTime } from './util'

describe('parseTime()', () => {
  it('should be return CurrentDate when passed Date', () => {
    const date = new Date('2017/1/1 12:00:00')
    const expected = {
      dateObject: date,
      year: '2017',
      month: 'January',
      days: 'Sunday',
      date: '01',
      hour: '12',
      minutes: '00',
      seconds: '0'
    }
    const actual = parseTime(date)

    expect(actual).toEqual(expected)
  })
})
