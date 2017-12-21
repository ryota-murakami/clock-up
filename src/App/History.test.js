import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { History } from './History'

describe('<History />', () => {
  describe('pass empty array', () => {
    function setup() {
      const wrapper = shallow(<History clocks={[]} />)
      return wrapper
    }

    it('should be render without error', () => {
      const wrapper = setup()

      expect(wrapper.exists()).toBe(true)
    })

    it('should be render with N/A', () => {
      const wrapper = setup()

      expect(wrapper.find('Table__Td').exists()).toBe(true)
      expect(
        wrapper
          .find('Table__Td')
          .first()
          .dive()
          .exists()
      ).toBe(true)
      expect(
        wrapper
          .find('Table__Td')
          .first()
          .dive()
          .text()
      ).toEqual('N/A')
    })

    it('should be match snapshot', () => {
      const wrapper = setup()

      expect(toJson(wrapper)).toMatchSnapshot()
    })
  })
})
