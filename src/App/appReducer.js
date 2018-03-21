// @flow
import { parseTime } from '../common/util'
import type { CurrentTime } from '../types/CurrentTime'
import type { AppReduxState } from '../types/AppReduxState'
import type { ReduxAction } from '../types/ReduxAction'
import type { HistoryQueryParameter } from '../types/HistoryQueryParameter'

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

      return Object.assign({}, state, { currentTime: currentTime })
    default:
      return state
  }
}
