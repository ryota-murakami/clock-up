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

export type ReduxAction = SyncDateAction | ChangeHistoryAction
