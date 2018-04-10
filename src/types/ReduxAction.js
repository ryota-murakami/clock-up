// @flow

import type { CurrentTime } from './AppReduxState'
import { SYNC_DATE, CHANGE_HISTORY } from '../const'

export type SyncDateAction = { type: SYNC_DATE, currentTime: CurrentTime }

export type Period = '1week' | '1month' | 'all'

type ChangeHistoryAction = {
  type: CHANGE_HISTORY,
  period: Period
}

export type ReduxAction = SyncDateAction | ChangeHistoryAction
