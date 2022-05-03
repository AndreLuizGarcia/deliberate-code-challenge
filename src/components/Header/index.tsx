import React from 'react'
import { Link } from 'react-router-dom'

import { Wrapper } from './styles'
export default function Header() {
  return (
    <Wrapper>
      <img src="/logo.png" alt="Health Wellness" title="Health Wellness" />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/categories-topics">Categories And Topics</Link>
      </nav>
    </Wrapper>
  )
}
