// @flow

/**
 * all of current new Date() related data.
 * use to ReduxState.
 * update every 1 second by setInterval() dispached "SYNC_DATE" action.
 */
export type CurrentTime = {
  dateObject: Date, // typcally use to calculate TotalTime.
  year: string,
  month: string,
  days: string,
  date: string,
  hour: string,
  minutes: string,
  seconds: string
}
