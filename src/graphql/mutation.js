import gql from 'graphql-tag'

export const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($idToken: String!) {
    createUser(authProvider: { auth0: { idToken: $idToken } }) {
      id
    }
  }
`

export const CLOCK_IN_MUTATION = gql`
  mutation CLOCK_IN_MUTATION($userId: ID!, $clockIn: DateTime, $day: Day!) {
    createClock(userId: $userId, clockIn: $clockIn, day: $day) {
      id
      day
      clockIn
      clockOut
    }
    updateUser(id: $userId, isDuringClockIn: true) {
      id
      isDuringClockIn
      clocks(last: 1) {
        id
        day
        clockIn
        clockOut
      }
    }
  }
`

export const CLOCK_OUT_MUTATION = gql`
  mutation CLOCK_OUT_MUTATION(
    $clockId: ID!
    $userId: ID!
    $clockOut: DateTime
  ) {
    updateClock(id: $clockId, userId: $userId, clockOut: $clockOut) {
      id
      clockIn
      clockOut
    }
    updateUser(id: $userId, isDuringClockIn: false) {
      id
      isDuringClockIn
      clocks(last: 1) {
        id
        clockIn
        clockOut
      }
    }
  }
`

export const EDIT_CLOCK_IN_MUTATON = gql`
  mutation EDIT_CLOCK_IN_MUTATON($clockId: ID!, $clockIn: DateTime) {
    updateClock(id: $clockId, clockIn: $clockIn) {
      id
      clockIn
    }
  }
`

export const EDIT_CLOCK_OUT_MUTATION = gql`
  mutation EDIT_CLOCK_OUT_MUTATION($clockId: ID!, $clockOut: DateTime) {
    updateClock(id: $clockId, clockOut: $clockOut) {
      id
      clockOut
    }
  }
`

export const DELETE_CLOCK_MUTATION = gql`
  mutation DELETE_CLOCK_MUTATION($clockId: ID!) {
    deleteClock(id: $clockId) {
      id
    }
  }
`
