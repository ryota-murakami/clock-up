import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import Auth0Lock from 'auth0-lock'

import { LoginButton } from '../src/Login/LoginButton'
import { Loading } from '../src/components/Loading'
import { CurrentDateTime } from '../src/App/CurrentDateTime'
import LogoutBtn from '../src/App/LogoutButton'
import { ClockinButton } from '../src/App/Control/ClockinButton'
import { ClockoutButton } from '../src/App/Control/ClockoutButton'
import ClockinTime from '../src/App/Control/ClockinTime'

storiesOf('ログインページ', module).add('LoginButton', () => {
  const lock = new Auth0Lock('story', 'book')

  return <LoginButton lock={lock} />
})

storiesOf('汎用コンポーネント', module).add('Loading', () => {
  return <Loading />
})

storiesOf('メインページ', module)
  .add('CurrentDateTime', () => {
    return <CurrentDateTime />
  })
  .add('LogoutBtn', () => {
    return <LogoutBtn />
  })
  .add('ClockinBtn', () => {
    return <ClockinButton />
  })
  .add('ClockoutBtn', () => {
    return <ClockoutButton />
  })
  .add('ClockinTime', () => {
    return <ClockinTime />
  })
