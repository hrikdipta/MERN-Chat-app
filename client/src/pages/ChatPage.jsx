import React from 'react'
import { useSelector } from 'react-redux'
import NavbarComponent from '../components/Navbar'
import ChatSidebar from '../components/ChatSidebar'
import ChatBox from '../components/ChatBox'
import { Navigate } from 'react-router-dom'
function ChatPage() {
    const {currentUser} = useSelector((state)=>state.user)
  return (
    currentUser ? 
    <div className='h-screen flex flex-col '>
        <NavbarComponent/>
        <div className='flex flex-1 overflow-hidden'>
            <ChatSidebar/>
            <ChatBox/>
        </div>
    </div>
    :
    <Navigate to={'/auth'}/>
  )
}

export default ChatPage
