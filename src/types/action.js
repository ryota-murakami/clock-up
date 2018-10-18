// @flow
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

export type CLICK_HISTORY_DELETE_BUTTON = {
  type: 'CLICK_HISTORY_DELETE_BUTTON'
}

export type ReduxAction =
  | EDIT_IN_TIME__TRUE
  | EDIT_IN_TIME__FALSE
  | CHECK_DELETE_HISTORY
  | UNCHECK_DELETE_HISTORY
  | CLICK_HISTORY_DELETE_BUTTON
  | EDIT_OUT_TIME__TRUE
  | EDIT_OUT_TIME__FALSE
