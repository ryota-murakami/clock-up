// @flow
import type { Period } from './domainType'
import type { CurrentTime } from './domainType'

export type SyncDateAction = {
  type: '@@/App/SYNC_DATE',
  currentTime: CurrentTime
}

type ChangeHistoryAction = {
  type: '@@/App/CHANGE_HISTORY',
  period: Period
}

export type ReduxAction = SyncDateAction | ChangeHistoryAction
