// @flow
import type { ReduxAction } from './types/action'
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

export default function reducer(
  state: ReduxState = initialState,
  action: ReduxAction
): ReduxState {
  switch (action.type) {
    case 'ON_CHANGE_HISTORY_FILTER':
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
    case 'CHECK_DELETE_HISTORY':
      return {
        ...state,
        checkedHistoryIdList: [...state.checkedHistoryIdList, action.clockId]
      }

    // Toggle Delete Checkbox
    case 'UNCHECK_DELETE_HISTORY':
      const id = action.clockId
      const freshcheckedHistoryIdList = state.checkedHistoryIdList.filter(
        v => v !== id
      )
      return { ...state, checkedHistoryIdList: freshcheckedHistoryIdList }

    // Sent GQL mutation after that Refresh checked id list
    case 'ON_CLICK_HISTORY_DELETE_BUTTON':
      return { ...state, checkedHistoryIdList: [] }

    /**
     * Edit History Information
     */
    case 'EDIT_IN_TIME':
      return { ...state, EDIT_IN_TIME: true }

    case 'DONE_EDIT_IN_TIME':
      return { ...state, EDIT_IN_TIME: false }

    /**
     * Edit History OutTime
     */
    case 'EDIT_OUT_TIME':
      return { ...state, EDIT_OUT_TIME: true }

    case 'DONE_EDIT_OUT_TIME':
      return { ...state, EDIT_OUT_TIME: false }

    /**
     * Fallback
     */
    default:
      return state
  }
}
