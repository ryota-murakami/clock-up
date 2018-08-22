// @flow
import type { Period } from './dataTypes'

export type ChangeHistoryAction = {
  type: 'CHANGE_HISTORY_FILTER',
  period: Period
}

export type AddDeleteClockIdAction = {
  type: 'CHECK_DELETE_HISTORY',
  clockId: string
}

export type RemoveDeleteClockIdAction = {
  type: 'UNCHECK_DELETE_HISTORY',
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
