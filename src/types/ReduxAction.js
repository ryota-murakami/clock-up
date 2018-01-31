// @flow

import type { CurrentTime } from './CurrentTime'
import { SYNC_DATE } from '../common/const'

export type SyncDateAction = {| type: SYNC_DATE, currentTime: CurrentTime |}

type InteractHistorySelectboxAction = {|
  type: 'INTEract_HistorySelectbox',
  foo: number
|}

export type ReduxAction = SyncDateAction | InteractHistorySelectboxAction
