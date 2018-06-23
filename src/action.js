// @flow
import type { Period } from './DataType'
import type { CurrentTime } from './DataType'

export type SyncDateAction = {
  type: 'SYNC_DATE',
  currentTime: CurrentTime
}

type ChangeHistoryAction = {
  type: 'CHANGE_HISTORY',
  period: Period
}

export type ReduxAction = SyncDateAction | ChangeHistoryAction
