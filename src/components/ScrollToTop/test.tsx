import React from 'react'

import { render } from '@testing-library/react'

import ScrollToTop from './index'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:1234/#/pim/promontions'
  })
}))

describe('ScrollToTop Component', () => {
  it('should run useEffect when pathName changes', () => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f())
    window.scrollTo = jest.fn()

    render(<ScrollToTop />)

    expect(window.scrollTo).toHaveBeenCalledTimes(1)
  })
})
