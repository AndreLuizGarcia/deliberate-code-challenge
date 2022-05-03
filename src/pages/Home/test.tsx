import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { render, screen } from '@testing-library/react'

import Home from '.'
import AutoCompleteSearchBar from '../../components/AutoCompleteSearchBar'

describe('Home page', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    expect(screen.getByText('My Health')).toBeInTheDocument()
    expect(<AutoCompleteSearchBar />).toBeTruthy()
  })
})
