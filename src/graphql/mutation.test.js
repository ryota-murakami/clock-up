import { CreateUserMutation } from './mutation'

describe('CreateUserMutation', () => {
  it('should AST is not regression', () => {
    expect(CreateUserMutation).toMatchSnapshot()
  })
})
