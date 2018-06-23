import gql from 'graphql-tag'

export const CreateUserMutation = gql`
  mutation CreateUserMutation($idToken: String!) {
    createUser(authProvider: { auth0: { idToken: $idToken } }) {
      id
    }
  }
`

export const ClockInMutation = gql`
  mutation ClockInMutation($userId: ID!, $clockIn: DateTime) {
    createClock(userId: $userId, clockIn: $clockIn) {
      id
      clockIn
      clockOut
    }
    updateUser(id: $userId, isDuringClockIn: true) {
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

export const ClockOutMutation = gql`
  mutation ClockOutMutation($clockId: ID!, $userId: ID!, $clockOut: DateTime) {
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
