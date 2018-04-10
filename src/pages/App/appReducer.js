// @flow
import { parseTime } from '../../util'
import type { CurrentTime } from '../../types/CurrentTime'
import type { AppReduxState } from '../../types/AppReduxState'
import type { ReduxAction } from '../../types/ReduxAction'
import type { HistoryQueryParameter } from '../../types/AppReduxState'

const currentTime: CurrentTime = parseTime(new Date())
const historyQueryParameter: HistoryQueryParameter = {
  first: 7,
  orderBy: 'createdAt_DESC'
}

const initialState: AppReduxState = {
  currentTime: currentTime,
  historyQueryParameter: historyQueryParameter
}

export default function appReducer(
  state: AppReduxState = initialState,
  action: ReduxAction
): AppReduxState {
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
