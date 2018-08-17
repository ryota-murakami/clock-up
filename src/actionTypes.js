// @flow
import type { Period } from './dataTypes'
import type { CurrentTime } from './dataTypes'

export type SyncDateAction = {
  type: 'SYNC_DATE',
  currentTime: CurrentTime
}

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

export type ReduxAction =
  | SyncDateAction
  | ChangeHistoryAction
  | EditInTimeInputAction
  | FinishInTimeInputAction
  | AddDeleteClockIdAction
  | RemoveDeleteClockIdAction
