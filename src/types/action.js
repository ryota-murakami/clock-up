// @flow
import type { Period } from './data'

export type ON_CHANGE_HISTORY_FILTER = {
  type: 'ON_CHANGE_HISTORY_FILTER',
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

export type DONE_EDIT_IN_TIME = {
  type: 'DONE_EDIT_IN_TIME'
}

export type EDIT_OUT_TIME = {
  type: 'EDIT_OUT_TIME'
}

export type DONE_EDIT_OUT_TIME = {
  type: 'DONE_EDIT_OUT_TIME'
}

export type ON_CLICK_HISTORY_DELETE_BUTTON = {
  type: 'ON_CLICK_HISTORY_DELETE_BUTTON'
}

export type ReduxAction =
  | ON_CHANGE_HISTORY_FILTER
  | EDIT_IN_TIME
  | DONE_EDIT_IN_TIME
  | CHECK_DELETE_HISTORY
  | UNCHECK_DELETE_HISTORY
  | ON_CLICK_HISTORY_DELETE_BUTTON
  | EDIT_OUT_TIME
  | DONE_EDIT_OUT_TIME
