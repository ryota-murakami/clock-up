// @flow
import type { ReduxAction } from './types/action'
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
    case 'CLICK_HISTORY_DELETE_BUTTON':
      return {
        ...state,
        checkedHistoryIdList: [...state.checkedHistoryIdList, action.clockId]
      }

    // Toggle Delete Checkbox
    case 'UNCLICK_HISTORY_DELETE_BUTTON':
      const id = action.clockId
      const freshcheckedHistoryIdList = state.checkedHistoryIdList.filter(
        v => v !== id
      )
      return { ...state, checkedHistoryIdList: freshcheckedHistoryIdList }

    // Sent GQL mutation after that Refresh checked id list
    case 'CLICK_HISTORY_DELETE_BUTTON':
      return { ...state, checkedHistoryIdList: [] }

    /**
     * Is Editting InTime?
     */
    case 'EDIT_IN_TIME__TRUE':
      return { ...state, EDIT_IN_TIME: true }

    case 'EDIT_IN_TIME__FALSE':
      return { ...state, EDIT_IN_TIME: false }

    /**
     * Is Editting OutTime?
     */
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
