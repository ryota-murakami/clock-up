// @flow

import type { AppReduxState } from './AppReduxState'
import { routerReducer } from 'react-router-redux'

type RouterReducer = routerReducer

export type ReduxState = {
  app: AppReduxState,
  router: RouterReducer
}
