// @flow
import type { CurrentTime, Period } from './reducer'

export type SyncDateAction = {
  type: '@@/App/SYNC_DATE',
  currentTime: CurrentTime
}

type ChangeHistoryAction = {
  type: '@@/App/CHANGE_HISTORY',
  period: Period
}

export type ReduxAction = SyncDateAction | ChangeHistoryAction
