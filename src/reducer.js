// @flow
import { parseTime } from './function'
import { type } from './types/ReduxAction'
import type { CurrentTime } from './types/ReduxState'
import type { AppState } from './types/ReduxState'
import type { Period, ReduxAction } from './types/ReduxAction'
import type { HistoryQueryParameter } from './types/ReduxState'

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
