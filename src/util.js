// @flow
import type { CurrentTime } from './types/ReduxState'

export function parseTime(dateObj: Date = new Date()): CurrentTime {
  const days = []
  days[0] = 'Sunday'
  days[1] = 'Monday'
  days[2] = 'Tuesday'
  days[3] = 'Wednesday'
  days[4] = 'Thursday'
  days[5] = 'Friday'
  days[6] = 'Saturday'

  const month = []
  month[0] = 'January'
  month[1] = 'February'
  month[2] = 'March'
  month[3] = 'April'
  month[4] = 'May'
  month[5] = 'June'
  month[6] = 'July'
  month[7] = 'August'
  month[8] = 'September'
  month[9] = 'October'
  month[10] = 'November'
  month[11] = 'December'

  return {
    dateObject: dateObj,
    year: String(dateObj.getFullYear()),
    month: month[dateObj.getMonth()],
    days: days[dateObj.getDay()],
    date: pad2(String(dateObj.getDate())),
    hour: pad2(String(dateObj.getHours())),
    minutes: pad2(String(dateObj.getMinutes())),
    seconds: String(dateObj.getSeconds())
  }
}

/**
 * 8 to 08
 * @param str
 * @returns {string}
 */
export function pad2(str: string): string {
  return ('00' + str).slice(-2)
}

/**
 * millisecounds to 00h00m
 * @param now
 * @param past
 * @returns {string}
 */
export function calcTotalTime(now: Date, past: Date): string {
  // always now > past
  const diff = now - past // milliseconds

  // prevent sown minus e.g. -01h-59m
  if (diff <= 0) {
    return '00h00m'
  }

  let msec = diff
  let hh = Math.floor(msec / 1000 / 60 / 60)
  msec -= hh * 1000 * 60 * 60
  let mm = Math.floor(msec / 1000 / 60)

  return pad2(hh.toString()) + 'h' + pad2(mm.toString()) + 'm'
}

/**
 * ISO to 2017/12/15
 * @param iso
 * @constructor
 */
export function ISOtoYmd(iso: string): string {
  const dateObj = new Date(iso)
  const year = String(dateObj.getFullYear())
  const month = pad2(String(dateObj.getMonth() + 1))
  const date = pad2(String(dateObj.getDate()))

  return year + '/' + month + '/' + date
}

/**
 * ISO to 12:35
 * @param iso
 * @constructor
 */
export function ISOtoHm(iso: string): string {
  const dateObj = new Date(iso)
  const hour = pad2(String(dateObj.getHours()))
  const minutes = pad2(String(dateObj.getMinutes()))

  return hour + ':' + minutes
}

export function getObjectType(object: any): string {
  return Object.prototype.toString.call(object).slice(8, -1)
}
