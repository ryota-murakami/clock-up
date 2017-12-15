// @flow
export function parseTime(dateObj = new Date()) {
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

function pad2(str: string): string {
  return ('00' + str).slice(-2)
}

export function calcTimeDiff(now: Date, past: Date): string {
  const diff = now - past // milliseconds
  var msec = diff
  const hh = Math.floor(msec / 1000 / 60 / 60)
  msec -= hh * 1000 * 60 * 60
  const mm = Math.floor(msec / 1000 / 60)
  msec -= mm * 1000 * 60
  const ss = Math.floor(msec / 1000)

  return pad2(hh) + 'h' + pad2(mm) + 'm' + pad2(ss) + 's'
}

export function ISOtoYmd(iso: string): string {
  const dateObj = new Date(iso)
  const year = String(dateObj.getFullYear())
  const month = pad2(String(dateObj.getMonth()))
  const date = pad2(String(dateObj.getDate()))
  const hour = pad2(String(dateObj.getHours()))
  const minutes = pad2(String(dateObj.getMinutes()))

  return year + '/' + month + '/' + date + ' ' + hour + ':' + minutes
}
