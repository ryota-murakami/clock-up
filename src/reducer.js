// @flow
import type {
  ReduxAction,
  EDIT_IN_TIME__TRUE,
  EDIT_IN_TIME__FALSE,
  EDIT_OUT_TIME__TRUE,
  EDIT_OUT_TIME__FALSE,
  ON_CLICK_HISTORY_DELETE_BUTTON,
  UNCHECK_DELETE_HISTORY,
  CHECK_DELETE_HISTORY,
  ON_CHANGE_HISTORY_FILTER
} from './types/action'
import type { Reducer } from 'redux'
import type { HistoryQueryArguments, Period } from './types/data'

export type ReduxState = {
  historyQueryArguments: HistoryQueryArguments,
  EDIT_IN_TIME: boolean,
  EDIT_OUT_TIME: boolean,
  checkedHistoryIdList: Array<string>
}

const initialState: ReduxState = {
  historyQueryArguments: {
    first: 7,
    orderBy: 'createdAt_DESC'
  },
  EDIT_IN_TIME: false,
  EDIT_OUT_TIME: false,
  checkedHistoryIdList: []
}

const reducer: Reducer<ReduxState, ReduxAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    // prettier-ignore
    case ('ON_CHANGE_HISTORY_FILTER':$PropertyType<ON_CHANGE_HISTORY_FILTER, 'type'>):
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
      const newValue: HistoryQueryArguments = {
        first: first,
        orderBy: 'createdAt_DESC'
      }

      return { ...state, historyQueryArguments: newValue }

    // Toggle Delete Checkbox
    case ('CHECK_DELETE_HISTORY': $PropertyType<CHECK_DELETE_HISTORY, 'type'>):
      return {
        ...state,
        checkedHistoryIdList: [...state.checkedHistoryIdList, action.clockId]
      }

    // Toggle Delete Checkbox
    // prettier-ignore
    case ('UNCHECK_DELETE_HISTORY': $PropertyType<UNCHECK_DELETE_HISTORY, 'type'>):
      const id = action.clockId
      const freshcheckedHistoryIdList = state.checkedHistoryIdList.filter(
        v => v !== id
      )
      return { ...state, checkedHistoryIdList: freshcheckedHistoryIdList }

    // Sent GQL mutation after that Refresh checked id list
    // prettier-ignore
    case ('ON_CLICK_HISTORY_DELETE_BUTTON': $PropertyType<ON_CLICK_HISTORY_DELETE_BUTTON, 'type'>):
      return { ...state, checkedHistoryIdList: [] }

    /**
     * Is Editting InTime?
     */
    case ('EDIT_IN_TIME__TRUE': $PropertyType<EDIT_IN_TIME__TRUE, 'type'>):
      return { ...state, EDIT_IN_TIME: true }

    case ('EDIT_IN_TIME__FALSE': $PropertyType<EDIT_IN_TIME__FALSE, 'type'>):
      return { ...state, EDIT_IN_TIME: false }

    /**
     * Is Editting OutTime?
     */
    case ('EDIT_OUT_TIME__TRUE': $PropertyType<EDIT_OUT_TIME__TRUE, 'type'>):
      return { ...state, EDIT_OUT_TIME: true }

    case ('EDIT_OUT_TIME__FALSE': $PropertyType<EDIT_OUT_TIME__FALSE, 'type'>):
      return { ...state, EDIT_OUT_TIME: false }

    /**
     * Fallback
     */
    default:
      return state
  }
}

export default reducer
