// @flow
import type { ReduxAction } from './actionTypes'
import type { HistoryGQLParam, Period } from './dataTypes'

export type ReduxState = {
  historyGQLParam: HistoryGQLParam,
  EditHistoryInTime: boolean,
  checkedHistoryIdList: Array<string>
}

const initialState: ReduxState = {
  historyGQLParam: {
    first: 7,
    orderBy: 'createdAt_DESC'
  },
  EditHistoryInTime: false,
  checkedHistoryIdList: []
}

export default function reducer(
  state: ReduxState = initialState,
  action: ReduxAction
): ReduxState {
  switch (action.type) {
    case 'CHANGE_HISTORY_FILTER':
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
      const newValue: HistoryGQLParam = {
        first: first,
        orderBy: 'createdAt_DESC'
      }

      return { ...state, historyGQLParam: newValue }

    // Toggle Delete Checkbox
    case 'CHECK_DELETE_HISTORY':
      return {
        ...state,
        checkedHistoryIdList: [...state.checkedHistoryIdList, action.clockId]
      }

    // Toggle Delete Checkbox
    case 'UNCHECK_DELETE_HISTORY':
      const freshcheckedHistoryIdList = state.checkedHistoryIdList.filter(
        // $FlowIssue
        v => v !== action.clockId
      )
      return { ...state, checkedHistoryIdList: freshcheckedHistoryIdList }

    // Refresh checked id list
    case 'PUSH_HISTORY_DELETE_BUTTON':
      return { ...state, checkedHistoryIdList: [] }

    case 'DURING_EDIT_HISTORY_IN_TIME':
      return { ...state, EditHistoryInTime: true }

    case 'FINISH_EDIT_HISTORY_IN_TIME':
      return { ...state, EditHistoryInTime: false }

    default:
      return state
  }
}
