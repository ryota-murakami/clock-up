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

/**
 * Is Editting InTime?
 */
export type EDIT_IN_TIME__TRUE = {
  type: 'EDIT_IN_TIME__TRUE'
}
export type EDIT_IN_TIME__FALSE = {
  type: 'EDIT_IN_TIME__FALSE'
}

/**
 * Is Editting OutTime?
 */
export type EDIT_OUT_TIME__TRUE = {
  type: 'EDIT_OUT_TIME__TRUE'
}
export type EDIT_OUT_TIME__FALSE = {
  type: 'EDIT_OUT_TIME__FALSE'
}

export type ToggleAction =
  | EDIT_IN_TIME__TRUE
  | EDIT_IN_TIME__FALSE
  | EDIT_OUT_TIME__TRUE
  | EDIT_OUT_TIME__FALSE

export type ON_CLICK_HISTORY_DELETE_BUTTON = {
  type: 'ON_CLICK_HISTORY_DELETE_BUTTON'
}

export type ReduxAction =
  | ON_CHANGE_HISTORY_FILTER
  | EDIT_IN_TIME__TRUE
  | EDIT_IN_TIME__FALSE
  | CHECK_DELETE_HISTORY
  | UNCHECK_DELETE_HISTORY
  | ON_CLICK_HISTORY_DELETE_BUTTON
  | EDIT_OUT_TIME__TRUE
  | EDIT_OUT_TIME__FALSE
