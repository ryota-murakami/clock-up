import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import Auth0Lock from 'auth0-lock'

import { LoginButton } from '../src/Login/LoginButton'
import { Loading } from '../src/common/components/Loading'
import { CurrentDateTime } from '../src/App/CurrentDateTime'
import { LogoutButton } from '../src/App/LogoutButton'
import { ClockinButton } from '../src/App/Control/ClockinButton'
import { ClockoutButton } from '../src/App/Control/ClockoutButton'
import { ClockinTime } from '../src/App/Control/ClockinTime'
import { data } from './data'
import { injectGlobal } from 'styled-components'

injectGlobal`
  html,
  body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  }
`
// TODO プリミティブなButtonのstoryを追加する
storiesOf('コンポーネント一覧', module)
  .add('Loading', () => {
    return <Loading />
  })
  .add('LoginButton', () => {
    const lock = new Auth0Lock('story', 'book')

    return <LoginButton lock={lock} />
  })
  .add('LogoutButton', () => {
    return <LogoutButton />
  })
  .add('ClockinButton', () => {
    return <ClockinButton />
  })
  .add('ClockoutButton', () => {
    return <ClockoutButton />
  })
  .add('CurrentDateTime', () => {
    const props = {
      year: '2017',
      month: 'December',
      days: 'Friday',
      date: '22',
      hour: '21',
      minutes: '41',
      seconds: '52'
    }
    return <CurrentDateTime {...props} />
  })
  .add('ClockinTime', () => {
    return <ClockinTime data={data} dateObject={new Date('2017/12/20')} />
  })
