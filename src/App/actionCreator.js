import { parseTime } from '../common/util'
import type { CurrentTime } from '../types/CurrentTime'

export const SYNC_DATE = 'SYNC_DATE'

export function syncDate() {
  const time: CurrentTime = parseTime(new Date())
  return {
    type: SYNC_DATE,
    currentTime: time
  }
}
