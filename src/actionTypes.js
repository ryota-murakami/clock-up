// @flow
import type { Period } from './dataTypes'
import type { CurrentTime } from './dataTypes'

export type SyncDateAction = {
  type: 'SYNC_DATE',
  currentTime: CurrentTime
}

type ChangeHistoryAction = {
  type: 'CHANGE_HISTORY',
  period: Period
}

type EditInTimeInputAction = {
  type: 'EDIT_IN_TIME_INPUT'
}

type FinishInTimeInputAction = {
  type: 'FINISH_IN_TIME_INPUT'
}

export type ReduxAction =
  | SyncDateAction
  | ChangeHistoryAction
  | EditInTimeInputAction
  | FinishInTimeInputAction
