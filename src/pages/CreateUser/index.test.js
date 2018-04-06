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
    describe('isNotExistUserInAuth0() == true', () => {
      const emptyMock = jest.fn()
      const returnTrueMock = jest.fn().mockReturnValue(true)

      function setup() {
        const data = { loading: false }
        CreateUser.prototype.InsertUserDataToAuth0 = emptyMock
        CreateUser.prototype.isNotExistUserInAuth0 = returnTrueMock
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

      it('sould be fire InsertUserDataToAuth0()', () => {
        setup()

        expect(emptyMock).toBeCalled()
      })

      it("<Redirect to={{ pathname: '/' }} /> がreturnされること", () => {
        const wrapper = setup()

        expect(wrapper.find('Redirect').exists()).toEqual(true)
      })
    })
    describe('isNotExistUserInAuth0() == false', () => {
      const emptyMock = jest.fn()
      const returnFalseMock = jest.fn().mockReturnValue(false)

      function setup() {
        const data = { loading: false }
        CreateUser.prototype.InsertUserDataToAuth0 = emptyMock
        CreateUser.prototype.isNotExistUserInAuth0 = returnFalseMock
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

      it('should not fire InsertUserDataToAuth0()', () => {
        setup()

        expect(emptyMock).not.toBeCalled()
      })

      it("<Redirect to={{ pathname: '/' }} /> がreturnされること", () => {
        const wrapper = setup()

        expect(wrapper.find('Redirect').exists()).toEqual(true)
      })
    })
  })
})