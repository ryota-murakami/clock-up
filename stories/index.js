import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { MemoryRouter } from 'react-router'
import Auth0Lock from 'auth0-lock'

import LoginButton from '../src/Login/LoginButton'

storiesOf('Login Pagee', module).add('LoginButton', () => {
  const lock = new Auth0Lock('story', 'book')

  return (
    <MemoryRouter>
      <LoginButton lock={lock} />
    </MemoryRouter>
  )
})
