// @flow
import { parseTime } from './function'
import { routerReducer } from 'react-router-redux'
import type { Period, ReduxAction } from './types/ReduxAction'
import { type } from './types/ReduxAction'

/**
 * <Domain Date Type>
 */
export type OrderBy = 'createdAt_DESC' | 'createdAt_ASC'
export type HistoryQueryParameter = {
  first: number,
  orderBy: OrderBy
}

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
/**
 * ↓↓ is entire Redux State tree.
 * app is whole of end-developer land.(it means code of src/**)
 * router is react-router-redux liblary land.
 *
 * {
 *  router: {
 *    location: {
 *      pathname: '/',
 *      search: '',
 *      hash: '',
 *      key: '2chitk'
 *    }
 *  },
 *  app: {
 *    currentTime: {
 *      dateObject: '2017-12-25T09:54:44.207Z',
 *      year: '2017',
 *      month: 'December',
 *      days: 'Monday',
 *      date: '25',
 *      hour: '18',
 *      minutes: '54',
 *      seconds: '44'
 *    },
 *    historySelectQuery: "first: 7, orderBy: createdAt_DESC"
 *  }
 *}
 */

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
    case type.SYNC_DATE:
      const currentTime: CurrentTime = action.currentTime

      return { ...state, currentTime: currentTime }

    // TODO date period
    case type.CHANGE_HISTORY:
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
