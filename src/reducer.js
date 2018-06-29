// @flow
import { parseTime } from './functions'
import type { ReduxAction } from './actionTypes'
import type { CurrentTime, HistoryQueryParameter, Period } from './dataTypes'

export type ReduxState = {
  currentTime: CurrentTime,
  historyQueryParameter: HistoryQueryParameter,
  isInTimeEditing: boolean
}

const initialState: ReduxState = {
  currentTime: parseTime(new Date()),
  historyQueryParameter: {
    first: 7,
    orderBy: 'createdAt_DESC'
  },
  isInTimeEditing: false
}

export default function reducer(
  state: ReduxState = initialState,
  action: ReduxAction
): ReduxState {
  switch (action.type) {
    case 'SYNC_DATE':
      const currentTime: CurrentTime = action.currentTime

      return { ...state, currentTime: currentTime }

    // TODO date period
    case 'CHANGE_HISTORY':
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

    case 'EDIT_IN_TIME_INPUT':
      return { ...state, isInTimeEditing: true }

    case 'FINISH_IN_TIME_INPUT':
      return { ...state, isInTimeEditing: false }

    default:
      return state
  }
}
