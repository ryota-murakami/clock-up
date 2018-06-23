// @flow
import { parseTime } from './function'
import type { ReduxAction } from './ActionType'
import type { CurrentTime, HistoryQueryParameter, Period } from './DataType'

export type ReduxState = {
  currentTime: CurrentTime,
  historyQueryParameter: HistoryQueryParameter
}

const initialState: ReduxState = {
  currentTime: parseTime(new Date()),
  historyQueryParameter: {
    first: 7,
    orderBy: 'createdAt_DESC'
  }
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

    default:
      return state
  }
}
