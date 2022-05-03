import React from 'react'

import { render, screen } from '@testing-library/react'

import SuggestionCard from './index'

describe('SuggestionCard', () => {
  it('should render with children correctly', () => {
    render(
      <SuggestionCard>
        <h1>Children for test pourpose</h1>
      </SuggestionCard>
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Children for test pourpose'
    )
  })
})
