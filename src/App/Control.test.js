import React from 'react'
import { shallow } from 'enzyme'
import Control from './Control'

describe('<Control />', () => {
  describe('incorrect data', () => {
    const incorrectData = {}
    it('should be throw error', () => {
      expect(() => shallow(<Control data={incorrectData} />)).toThrow()
    })
  })
})
