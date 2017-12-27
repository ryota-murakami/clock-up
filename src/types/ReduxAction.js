// @flow

import type { CurrentTime } from './CurrentTime'

export type SyncDateAction = {| type: 'SYNC_DATE', currentTime: CurrentTime |}

type FooAction = {| type: 'FOO', foo: number |} // TODO dummy

export type ReduxAction = SyncDateAction | FooAction
