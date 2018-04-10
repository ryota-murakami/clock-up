// @flow
import { parseTime } from '../../util'
import type { CurrentTime } from '../../types/ReduxState'
import type { ReduxState } from '../../types/ReduxState'
import type { ReduxAction } from '../../types/ReduxAction'
import type { HistoryQueryParameter } from '../../types/ReduxState'

const currentTime: CurrentTime = parseTime(new Date())
const historyQueryParameter: HistoryQueryParameter = {
  first: 7,
  orderBy: 'createdAt_DESC'
}

const initialState: ReduxState = {
  currentTime: currentTime,
  historyQueryParameter: historyQueryParameter
}

export default function appReducer(
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
      switch (action.period) {
        case '1week':
          first = 7
          break
        case '1month':
          first = 30
          break
        case 'all':
          first = 100
          break
        default:
          first = 7
          break
      }
      const historyQueryParameter: HistoryQueryParameter = {
        first: first,
        orderBy: 'createdAt_DESC'
      }
      return { ...state, historyQueryParameter: historyQueryParameter }

    default:
      return state
  }
}
