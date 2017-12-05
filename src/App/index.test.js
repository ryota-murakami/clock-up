import React from 'react'
import { shallow } from 'enzyme'
import { App } from './index'

describe('<App />', () => {
  describe('data.loading == true', () => {
    function setup() {
      const data = { loading: true }
      const wrapper = shallow(<App data={data} />)

      return wrapper
    }

    it('[data]propsのみの受け渡しでErrorなくレンダリングされること', () => {
      expect(() => setup()).not.toThrow()
    })

    it('loadingが表示されること', () => {
      const wrapper = setup()

      expect(wrapper.find('Loading').exists()).toEqual(true)
    })
  })
  describe('data.loading == false', () => {
    function setup() {
      const data = { loading: false, user: null }
      const wrapper = shallow(<App data={data} />)

      return wrapper
    }

    it('[data]propsのみの受け渡しでErrorなくレンダリングされること', () => {
      expect(() => setup()).not.toThrow()
    })

    it('loadingが表示されないこと', () => {
      const wrapper = setup()

      expect(wrapper.find('Loading').exists()).toEqual(false)
    })
  })
})
