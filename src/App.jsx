import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from "react-hot-toast";
import ProtectedRoute from './components/ProtectedRoute'
import ProductDisplay from './components/ProductDisplay'


function App() {
  return (
    <>
    <Toaster/>
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      } />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/products/:id' element={<ProductDisplay/>}/>
    
    </Routes>
    </>

  )
}

export default App