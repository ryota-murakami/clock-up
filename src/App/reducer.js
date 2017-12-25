// @flow
import { SYNC_DATE } from './actions'
import { parseTime } from '../common/util'
import type { CurrentTime } from '../types/CurrentTime'
import type { ReduxState } from '../types/ReduxState'
// TODO rename filename to AppReducer
const currentTime: CurrentTime = parseTime(new Date())

const initialState: ReduxState = {
  currentTime: currentTime
}

export default function app(
  state: ReduxState = initialState,
  action: Object
): ReduxState {
  switch (action.type) {
    case SYNC_DATE:
      const currentTime: CurrentTime = action.currentTime

      return Object.assign({}, state, { currentTime: currentTime })
    default:
      return state
  }
}
