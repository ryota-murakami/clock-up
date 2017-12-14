import { SYNC_DATE } from './actions'
import { parseTime } from '../util'

const initialState = parseTime(new Date())

export default function app(state = initialState, action) {
  switch (action.type) {
    case SYNC_DATE:
      const { hour, minutes, seconds } = action
      return Object.assign({}, state, { hour, minutes, seconds })
    default:
      return state
  }
}
