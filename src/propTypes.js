// @flow
import type { Match, Location, RouterHistory } from 'react-router'

export type WithRouterProps = {|
  match: Match,
  location: Location,
  history: RouterHistory
|}
