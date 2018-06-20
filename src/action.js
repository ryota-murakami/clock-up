// @flow
import type { Period } from './dataType'
import type { CurrentTime } from './dataType'

export type SyncDateAction = {
  type: 'SYNC_DATE',
  currentTime: CurrentTime
}

type ChangeHistoryAction = {
  type: 'CHANGE_HISTORY',
  period: Period
}

export type ReduxAction = SyncDateAction | ChangeHistoryAction
