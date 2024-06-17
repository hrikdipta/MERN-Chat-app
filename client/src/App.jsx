import React from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './pages/AuthPage'
import NavbarComponent from './components/Navbar'
import ChatPage from './pages/ChatPage'
import Dashboard from './pages/Dashboard'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/auth' element={<AuthPage/>}/>
        <Route path='/chat' element={<ChatPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
