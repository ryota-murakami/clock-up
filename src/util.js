// @flow
export function parseTime(date = new Date()) {
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
    dateObject: date,
    year: String(date.getFullYear()),
    month: month[date.getMonth()],
    days: days[date.getDay()],
    date: pad(String(date.getDate())),
    hour: pad(String(date.getHours())),
    minutes: pad(String(date.getMinutes())),
    seconds: String(date.getSeconds())
  }
}

function pad(str: string): string {
  return ('00' + str).slice(-2)
}
