// @flow
import type { ReduxAction } from './types/action'
import type { Reducer } from 'redux'

export type ReduxState = {
  EDIT_IN_TIME: boolean,
  EDIT_OUT_TIME: boolean,
  checkedHistoryIdList: Array<string>,
  DELETE_HISTORY_DIALOG: boolean
}

const initialState: ReduxState = {
  EDIT_IN_TIME: false,
  EDIT_OUT_TIME: false,
  checkedHistoryIdList: [],
  DELETE_HISTORY_DIALOG: false
}

const reducer: Reducer<ReduxState, ReduxAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    /**
     * Handle history delete UI
     */
    case 'CHECK_DELETE_HISTORY':
      return {
        ...state,
        checkedHistoryIdList: [...state.checkedHistoryIdList, action.clockId]
      }

    case 'UNCHECK_DELETE_HISTORY':
      return {
        ...state,
        checkedHistoryIdList: state.checkedHistoryIdList.filter(
          v => v !== action.clockId
        )
      }

    case 'SHOW_DELETE_HISTORY_DIALOG':
      return { ...state, DELETE_HISTORY_DIALOG: true }

    // Sent GQL mutation after that Refresh checked id list
    case 'CLICK_HISTORY_DELETE_BUTTON':
      return { ...state, checkedHistoryIdList: [] }

    // prettier-ignore
    // prettier-ignore
    // prettier-ignore
    /**
     * Input Cancel Handler when user clicked screen someelse input
     */
    // Is Editting InTime?
    case 'EDIT_IN_TIME__TRUE':
      return { ...state, EDIT_IN_TIME: true }

    case 'EDIT_IN_TIME__FALSE':
      return { ...state, EDIT_IN_TIME: false }

    // Is Editting OutTime?
    case 'EDIT_OUT_TIME__TRUE':
      return { ...state, EDIT_OUT_TIME: true }

    case 'EDIT_OUT_TIME__FALSE':
      return { ...state, EDIT_OUT_TIME: false }

    /**
     * Fallback
     */
    default:
      return state
  }
}

export default reducer
