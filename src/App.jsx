import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from "react-hot-toast";
import ProtectedRoute from './components/ProtectedRoute'


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
    </Routes>
    </>

  )
}

export default App