// @flow
import { SYNC_DATE } from '../common/const'
import { parseTime } from '../common/util'
import type { CurrentTime } from '../types/CurrentTime'
import type { AppReduxState } from '../types/AppReduxState'
import type { ReduxAction } from '../types/ReduxAction'
import type { HistorySelectQuery } from '../types/HistorySelectQuery'

const currentTime: CurrentTime = parseTime(new Date())
const historySelectQuery: HistorySelectQuery =
  'first: 7, orderBy: createdAt_DESC'

const initialState: AppReduxState = {
  currentTime: currentTime,
  historySelectQuery: historySelectQuery
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
