// @flow
import type { Period } from './dataTypes'

export type CHANGE_HISTORY_FILTER = {
  type: 'CHANGE_HISTORY_FILTER',
  period: Period
}

export type CHECK_DELETE_HISTORY = {
  type: 'CHECK_DELETE_HISTORY',
  clockId: string
}

export type UNCHECK_DELETE_HISTORY = {
  type: 'UNCHECK_DELETE_HISTORY',
  clockId: string
}

export type EDIT_IN_TIME = {
  type: 'EDIT_IN_TIME'
}

export type FINISH_EDIT_HISTORY_IN_TIME = {
  type: 'FINISH_EDIT_HISTORY_IN_TIME'
}

export type EDIT_OUT_TIME = {
  type: 'EDIT_OUT_TIME'
}

export type FINISH_EDIT_HISTORY_OUT_TIME = {
  type: 'FINISH_EDIT_HISTORY_OUT_TIME'
}

export type PUSH_HISTORY_DELETE_BUTTON = {
  type: 'PUSH_HISTORY_DELETE_BUTTON'
}

export type ReduxAction =
  | CHANGE_HISTORY_FILTER
  | EDIT_IN_TIME
  | FINISH_EDIT_HISTORY_IN_TIME
  | CHECK_DELETE_HISTORY
  | UNCHECK_DELETE_HISTORY
  | PUSH_HISTORY_DELETE_BUTTON
  | EDIT_OUT_TIME
  | FINISH_EDIT_HISTORY_OUT_TIME
