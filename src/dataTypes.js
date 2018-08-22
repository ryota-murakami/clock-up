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

export type OrderBy = 'createdAt_DESC' | 'createdAt_ASC'

export type HistoryGQLParam = {
  first: number,
  orderBy: OrderBy
}

export type Period = '1week' | '1month' | 'all'

export const AUTH0_ID_TOKEN = 'auth0IdToken'
