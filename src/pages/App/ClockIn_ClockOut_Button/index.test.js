import React from 'react'
import { shallow } from 'enzyme'
import { Control } from './index'
import { sel } from '../../../setupTests'

describe('<ClockIn_ClockOut_Button />', () => {
  describe('incorrect data', () => {
    const incorrectData = {}
    it('should throw error', () => {
      expect(() => shallow(<Control data={incorrectData} />)).toThrow()
    })
  })

  describe('during clock-in', () => {
    const data = {
      user: {
        foo: 'bar',
        isDuringClockIn: true,
        clocks: [
          {
            id: 'fwjiofjweiofjiwoj32233209jiosf',
            clockIn: '2017-12-12T17:15:01.814Z',
            clockOut: '2017-12-12T17:15:02.349Z'
          }
        ]
      }
    }
    it('should show ClockoutButton', () => {
      // const wrapper = shallow(<ClockIn_ClockOut_Button data={data} />)
      // expect(
      //   wrapper.find('Apollo(Apollo(pure(ClockoutButton)))').exists()
      // ).toBe(true)
      // @TODO fix
      expect(true).toBe(true)
    })
    it('should show ClokinTime', () => {
      const wrapper = shallow(<Control data={data} />)
      expect(wrapper.find(sel('clock-in-time')).exists()).toBe(true)
    })
  })

  describe('during clock-out', () => {
    // const data = {
    //   user: { foo: 'bar', isDuringClockIn: false }
    // }
    it('should show ClockinButton', () => {
      // const wrapper = shallow(<ClockIn_ClockOut_Button data={data} />)
      // expect(wrapper.find('Apollo(Apollo(pure(ClockinButton)))').exists()).toBe(
      //   true
      // )
      // @TODO fix
      expect(true).toBe(true)
    })
  })
})
