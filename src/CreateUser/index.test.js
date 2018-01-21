import React from 'react'
import { shallow } from 'enzyme'
import { CreateUser } from './index'

describe('<CreateUser />', () => {
  describe('data.loading == true', () => {
    function setup() {
      const data = { loading: true }
      const wrapper = shallow(<CreateUser data={data} />)

      return wrapper
    }

    it('[data]propsのみの受け渡しでErrorなくレンダリングされること', () => {
      expect(() => setup()).not.toThrow()
    })

    it('Loadingが表示されること', () => {
      const wrapper = setup()

      expect(wrapper.find('Loading').exists()).toEqual(true)
    })
  })
  describe('data.loading == false', () => {
    describe('isFreshUser() == true', () => {
      const createUser = jest.fn()
      const isFreshUser = jest.fn().mockReturnValue(true)

      function setup() {
        const data = { loading: false }
        CreateUser.prototype.InsertUserDataToAuth0 = createUser
        CreateUser.prototype.isNotExistUserInAuth0 = isFreshUser
        const wrapper = shallow(<CreateUser data={data} />)

        return wrapper
      }

      it('[data]propsのみの受け渡しでErrorなくレンダリングされること', () => {
        expect(() => setup()).not.toThrow()
      })

      it('Loadingが表示されないこと', () => {
        const wrapper = setup()

        expect(wrapper.find('Loading').exists()).toEqual(false)
      })

      it('createUser()が起動すること', () => {
        setup()

        expect(createUser).toBeCalled()
      })

      it("<Redirect to={{ pathname: '/' }} /> がreturnされること", () => {
        const wrapper = setup()

        expect(wrapper.find('Redirect').exists()).toEqual(true)
      })
    })
    describe('isFreshUser() == false', () => {
      const createUser = jest.fn()
      const isFreshUser = jest.fn().mockReturnValue(false)
      function setup() {
        const data = { loading: false }
        CreateUser.prototype.InsertUserDataToAuth0 = createUser
        CreateUser.prototype.isNotExistUserInAuth0 = isFreshUser
        const wrapper = shallow(<CreateUser data={data} />)

        return wrapper
      }

      it('[data]propsのみの受け渡しでErrorなくレンダリングされること', () => {
        expect(() => setup()).not.toThrow()
      })

      it('Loadingが表示されないこと', () => {
        const wrapper = setup()

        expect(wrapper.find('Loading').exists()).toEqual(false)
      })

      it('createUser()が起動しないこと', () => {
        setup()

        expect(createUser).not.toBeCalled()
      })

      it("<Redirect to={{ pathname: '/' }} /> がreturnされること", () => {
        const wrapper = setup()

        expect(wrapper.find('Redirect').exists()).toEqual(true)
      })
    })
  })
})
