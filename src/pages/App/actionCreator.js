import { parseTime } from '../../util'
import type { CurrentTime } from '../types/CurrentTime'
import { SYNC_DATE } from '../../const'
import type { SyncDateAction } from '../types/ReduxAction'

export const syncDate = (): SyncDateAction => {
  const time: CurrentTime = parseTime(new Date())
  return {
    type: SYNC_DATE,
    currentTime: time
  }
}