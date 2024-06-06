import React from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './pages/AuthPage'
import NavbarComponent from './components/Navbar'
import ChatPage from './pages/ChatPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthPage/>}/>
        <Route path='/chat' element={<ChatPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
