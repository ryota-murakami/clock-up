import { parseTime } from '../common/util'
import type { CurrentTime } from '../types/CurrentTime'
import { SYNC_DATE } from '../common/const'
import type { SyncDateAction } from '../types/ReduxAction'

export function syncDate(): SyncDateAction {
  const time: CurrentTime = parseTime(new Date())
  return {
    type: SYNC_DATE,
    currentTime: time
  }
}
