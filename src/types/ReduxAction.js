// @flow
import type { CurrentTime } from '../reducer'

export const type = {
  SYNC_DATE: '@@/App/SYNC_DATE',
  CHANGE_HISTORY: '@@/App/CHANGE_HISTORY'
}

export type SyncDateAction = {
  type: '@@/App/SYNC_DATE',
  currentTime: CurrentTime
}

export type Period = '1week' | '1month' | 'all'

type ChangeHistoryAction = {
  type: '@@/App/CHANGE_HISTORY',
  period: Period
}

export type ReduxAction = SyncDateAction | ChangeHistoryAction
