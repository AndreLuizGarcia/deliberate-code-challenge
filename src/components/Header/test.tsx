import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { render, screen } from '@testing-library/react'

import Header from './index'

describe('Header', () => {
  it('should render Header correctly', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

    expect(screen.getAllByRole('img')[0]).toBeInTheDocument()
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', '/logo.png')
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Categories And Topics')).toBeInTheDocument()
  })
})
