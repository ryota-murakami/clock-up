// @flow
import { parseTime } from './function'
import { routerReducer } from 'react-router-redux'
import type { Period, ReduxAction } from './action'

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

export type HistoryQueryParameter = {
  first: number,
  orderBy: OrderBy
}

export type AppState = {
  currentTime: CurrentTime,
  historyQueryParameter: HistoryQueryParameter
}

type RouterReducer = routerReducer

export type RootReduxState = {
  app: AppState,
  router: RouterReducer
}

const initialState: AppState = {
  currentTime: parseTime(new Date()),
  historyQueryParameter: {
    first: 7,
    orderBy: 'createdAt_DESC'
  }
}

export default function reducer(
  state: AppState = initialState,
  action: ReduxAction
): AppState {
  switch (action.type) {
    case '@@/App/SYNC_DATE':
      const currentTime: CurrentTime = action.currentTime

      return { ...state, currentTime: currentTime }

    // TODO date period
    case '@@/App/CHANGE_HISTORY':
      let first = ''
      const p: Period = action.period
      if (p === '1week') {
        first = 7
      } else if (p === '1month') {
        first = 30
      } else if (p === 'all') {
        first = 100
      } else {
        first = 7
      }
      const newValue: HistoryQueryParameter = {
        first: first,
        orderBy: 'createdAt_DESC'
      }

      return { ...state, historyQueryParameter: newValue }

    default:
      return state
  }
}
