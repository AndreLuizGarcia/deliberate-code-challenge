import React from 'react'
import { Routes } from 'react-router-dom'

import { shallow } from 'enzyme'

import App from './App'

describe('App', () => {
  it('should render routes in a correctly order', async () => {
    const wrapper = shallow(<App />)

    const routesWrapper = wrapper.find(Routes)
    expect(routesWrapper.children()).toHaveLength(3)

    await assertRoute(routesWrapper.childAt(0), '/')
    await assertRoute(routesWrapper.childAt(1), '/search')
    await assertRoute(routesWrapper.childAt(2), '/categories-topics')
  })
})

async function assertRoute(route: any, path: string) {
  expect(route.prop('path')).toBe(path)
}
