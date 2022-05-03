import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ScrollToTop from './components/ScrollToTop'
import Categories from './pages/Categories'
import Home from './pages/Home'
import Search from './pages/Search'
import GlobalStyles from './styles/globalStyles'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/categories-topics" element={<Categories />} />
      </Routes>
      <GlobalStyles />
    </BrowserRouter>
  )
}
