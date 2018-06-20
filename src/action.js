// @flow
import type { Period } from './domainType'
import type { CurrentTime } from './domainType'

export type SyncDateAction = {
  type: 'SYNC_DATE',
  currentTime: CurrentTime
}

type ChangeHistoryAction = {
  type: 'CHANGE_HISTORY',
  period: Period
}

export type ReduxAction = SyncDateAction | ChangeHistoryAction
