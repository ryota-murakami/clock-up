// @flow
import { SYNC_DATE } from '../common/const'
import { parseTime } from '../common/util'
import type { CurrentTime } from '../types/CurrentTime'
import type { ReduxState } from '../types/ReduxState'
import type { ReduxAction } from '../types/ReduxAction'

const currentTime: CurrentTime = parseTime(new Date())

const initialState: ReduxState = {
  currentTime: currentTime
}

export default function appReducer(
  state: ReduxState = initialState,
  action: ReduxAction
): ReduxState {
  switch (action.type) {
    case 'SYNC_DATE':
      const currentTime: CurrentTime = action.currentTime

      return Object.assign({}, state, { currentTime: currentTime })
    default:
      return state
  }
}
