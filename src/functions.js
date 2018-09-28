// @flow
import type { CurrentTime } from './types/data'

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
 * "8" to "08"
 * @param str
 * @return string
 */
export function pad2(str: string): string {
  return ('00' + str).slice(-2)
}

/**
 * millisecounds to 00h00m00s
 * @param now
 * @param past
 * @return string
 */
export function calcTotalTime(now: Date, past: Date): string {
  // always now > past
  const diff = now - past // milliseconds

  // prevent sown minus e.g. -01h-59m
  if (diff <= 0) {
    return '00h 00m 00s'
  }

  let msec = diff
  const hh = Math.floor(msec / 1000 / 60 / 60)
  msec -= hh * 1000 * 60 * 60
  const mm = Math.floor(msec / 1000 / 60)
  msec -= mm * 1000 * 60
  const ss = Math.floor(msec / 1000)

  return (
    pad2(hh.toString()) +
    'h ' +
    pad2(mm.toString()) +
    'm ' +
    pad2(ss.toString()) +
    's'
  )
}

/**
 * millisecounds to 00h00m
 * @param now
 * @param past
 * @return string
 */
export function calcTotalTimeWithoutSec(now: Date, past: Date): string {
  return calcTotalTime(now, past).slice(0, 7)
}

/**
 * ISO to "2017/12/15"
 * @param string
 * @return string
 */
export function ISOtoYmd(iso: string): string {
  const dateObj = new Date(iso)
  const year = String(dateObj.getFullYear())
  const month = pad2(String(dateObj.getMonth() + 1))
  const date = pad2(String(dateObj.getDate()))

  return year + '/' + month + '/' + date
}

/**
 * ISO to "12:35"
 * @param string
 * @return string
 */
export function ISOtoHm(iso: string): string {
  const dateObj = new Date(iso)
  const hour = pad2(String(dateObj.getHours()))
  const minutes = pad2(String(dateObj.getMinutes()))

  return hour + ':' + minutes
}

/**
 * getObjectType(new Date) => "Date"
 * @param object
 * @returns string
 */
export function getObjectType(object: any): string {
  return Object.prototype.toString.call(object).slice(8, -1)
}
