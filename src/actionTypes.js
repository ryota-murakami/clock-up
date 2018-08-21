// @flow
import type { Period } from './dataTypes'

export type ChangeHistoryAction = {
  type: 'CHANGE_HISTORY',
  period: Period
}

export type AddDeleteClockIdAction = {
  type: 'ADD_DElETE_CLOCK_ID',
  clockId: string
}

export type RemoveDeleteClockIdAction = {
  type: 'REMOVE_DElETE_CLOCK_ID',
  clockId: string
}

export type EditInTimeInputAction = {
  type: 'EDIT_IN_TIME_INPUT'
}

export type FinishInTimeInputAction = {
  type: 'FINISH_IN_TIME_INPUT'
}

export type PushHistoryDeleteButton = {
  type: 'PUSH_HISTORY_DELETE_BUTTON'
}

export type ReduxAction =
  | ChangeHistoryAction
  | EditInTimeInputAction
  | FinishInTimeInputAction
  | AddDeleteClockIdAction
  | RemoveDeleteClockIdAction
  | PushHistoryDeleteButton
