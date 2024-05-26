import React from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import AuthPage from './pages/AuthPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
