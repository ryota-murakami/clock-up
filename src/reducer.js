// @flow
import type { ReduxAction } from './actionTypes'
import type { HistoryQueryParameter, Period } from './dataTypes'

export type ReduxState = {
  historyQueryParameter: HistoryQueryParameter,
  isInTimeEditing: boolean,
  deleteClickIds: Array<string>
}

const initialState: ReduxState = {
  historyQueryParameter: {
    first: 7,
    orderBy: 'createdAt_DESC'
  },
  isInTimeEditing: false,
  deleteClickIds: []
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
      const newValue: HistoryQueryParameter = {
        first: first,
        orderBy: 'createdAt_DESC'
      }

      return { ...state, historyQueryParameter: newValue }

    // Toggle Delete Checkbox
    case 'CHECK_DELETE_HISTORY':
      return {
        ...state,
        deleteClickIds: [...state.deleteClickIds, action.clockId]
      }

    // Toggle Delete Checkbox
    case 'REMOVE_DElETE_CLOCK_ID':
      const freshDeleteClickIds = state.deleteClickIds.filter(
        // $FlowIssue
        v => v !== action.clockId
      )
      return { ...state, deleteClickIds: freshDeleteClickIds }

    // Refresh checked id list
    case 'PUSH_HISTORY_DELETE_BUTTON':
      return { ...state, deleteClickIds: [] }

    case 'EDIT_IN_TIME_INPUT':
      return { ...state, isInTimeEditing: true }

    case 'FINISH_IN_TIME_INPUT':
      return { ...state, isInTimeEditing: false }

    default:
      return state
  }
}
