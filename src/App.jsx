import React from 'react'
import LandingPage from './pages/LandingPage'
import './css/App.css'
import {  Routes, Route } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
const App = () => {
  return (
    
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/products/:firmId/:firmName' element={<ProductsPage />} />
      </Routes>
    </div>
  )
}

export default App
