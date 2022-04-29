import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Search from './pages/Search'
import GlobalStyles from './styles/globalStyles'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
      </Routes>
      <GlobalStyles />
    </BrowserRouter>
  )
}
