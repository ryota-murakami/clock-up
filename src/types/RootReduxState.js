// @flow
// TODO entire flow construction
import type { AppReduxState } from './AppReduxState'
import { routerReducer } from 'react-router-redux'

type RouterReducer = routerReducer

export type RootReduxState = {
  app: AppReduxState,
  router: RouterReducer
}
