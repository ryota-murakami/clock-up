// @flow
import type { CurrentTime } from './CurrentTime'

/**
 * ↓↓ is entire Redux State tree.
 * app is whole of end-developer land.(it means code of src/**)
 * router is react-router-redux liblary land.
 *
 * {
 *  router: {
 *    location: {
 *      pathname: '/',
 *      search: '',
 *      hash: '',
 *      key: '2chitk'
 *    }
 *  },
 *  app: {
 *    currentTime: {
 *      dateObject: '2017-12-25T09:54:44.207Z',
 *      year: '2017',
 *      month: 'December',
 *      days: 'Monday',
 *      date: '25',
 *      hour: '18',
 *      minutes: '54',
 *      seconds: '44'
 *    }
 *  }
 *}
 */
export type ReduxState = { currentTime: CurrentTime }
