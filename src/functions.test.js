import {
  parseTime,
  pad2,
  calcTotalTime,
  ISOtoYmd,
  ISOtoHm,
  getObjectType,
  calcTotalTimeWithoutSec
} from './functions'

describe('parseTime()', () => {
  it('should return CurrentDate when passed Date', () => {
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

describe('pad2()', () => {
  it('should return 2digit-zero-paddinged string when passing 1digit string', () => {
    expect(pad2('1')).toBe('01')
  })

  it('should return raw string when passing 2digit string', () => {
    expect(pad2('20')).toBe('20')
  })
})

describe('calcTotalTime()', () => {
  it('should return time diff string', () => {
    const now = new Date('2017/01/01 12:00:00')
    const past = new Date('2017/01/01 11:00:00')
    const res = calcTotalTime(now, past)
    expect(res).toBe('01h 00m 00s')
  })

  it('shoulb be return 00h00m00s when now < past', () => {
    const past = new Date('2017/01/01 12:00:00')
    const now = new Date('2017/01/01 11:00:00')
    const res = calcTotalTime(now, past)
    expect(res).toBe('00h 00m 00s')
  })
})

describe('calcTotalTimeWithoutSec', () => {
  it('should return time trimed string', () => {
    const now = new Date('2017/01/01 12:00:00')
    const past = new Date('2017/01/01 11:00:00')
    const res = calcTotalTimeWithoutSec(now, past)
    expect(res).toBe('01h 00m')
  })
})

describe('ISOtoYmd()', () => {
  it('should return yyyy/mm/dd', () => {
    const res = ISOtoYmd(new Date('2017/01/01 12:00:00'))
    expect(res).toBe('2017/01/01')
  })
})

describe('ISOtoHm()', () => {
  const res = ISOtoHm(new Date('2017/01/01 12:00:00'))
  expect(res).toBe('12:00')
})

describe('getObjectType()', () => {
  it('should return Date', () => {
    const date = new Date()
    expect(getObjectType(date)).toBe('Date')
  })

  it('should return Array', () => {
    const array = []
    expect(getObjectType(array)).toBe('Array')
  })

  it('should return String', () => {
    const string = ''
    expect(getObjectType(string)).toBe('String')
  })

  it('should return Boolean', () => {
    const boolean = true
    expect(getObjectType(boolean)).toBe('Boolean')
  })

  it('should return Number', () => {
    const number = 1
    expect(getObjectType(number)).toBe('Number')
  })

  it('should return Error', () => {
    expect(getObjectType(new Error())).toBe('Error')
  })

  it('should return Function', () => {
    expect(getObjectType(() => {})).toBe('Function')
  })

  it('should return Null', () => {
    expect(getObjectType(null)).toBe('Null')
  })

  it('should return Undefined', () => {
    expect(getObjectType(undefined)).toBe('Undefined')
  })
})
