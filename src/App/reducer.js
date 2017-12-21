import { SYNC_DATE } from './actions'
import { parseTime } from '../common/util'

const initialState = parseTime(new Date())

export default function app(state = initialState, action) {
  switch (action.type) {
    case SYNC_DATE:
      const {
        dateObject,
        year,
        month,
        days,
        date,
        hour,
        minutes,
        seconds
      } = action
      return Object.assign({}, state, {
        dateObject,
        year,
        month,
        days,
        date,
        hour,
        minutes,
        seconds
      })
    default:
      return state
  }
}
