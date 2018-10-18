// @flow
import type {
  ReduxAction,
  EDIT_IN_TIME__TRUE,
  EDIT_IN_TIME__FALSE,
  EDIT_OUT_TIME__TRUE,
  EDIT_OUT_TIME__FALSE,
  CLICK_HISTORY_DELETE_BUTTON,
  UNCHECK_DELETE_HISTORY,
  CHECK_DELETE_HISTORY
} from './types/action'
import type { Reducer } from 'redux'

export type ReduxState = {
  EDIT_IN_TIME: boolean,
  EDIT_OUT_TIME: boolean,
  checkedHistoryIdList: Array<string>
}

const initialState: ReduxState = {
  EDIT_IN_TIME: false,
  EDIT_OUT_TIME: false,
  checkedHistoryIdList: []
}

const reducer: Reducer<ReduxState, ReduxAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
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
    case ('CLICK_HISTORY_DELETE_BUTTON': $PropertyType<CLICK_HISTORY_DELETE_BUTTON, 'type'>):
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
