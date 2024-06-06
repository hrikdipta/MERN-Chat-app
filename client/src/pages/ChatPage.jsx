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
    <div className=' min-h-screen'>
        <NavbarComponent/>
        <div className='flex flex-row px-3 md:px-6 py-3'>
            <ChatSidebar/>
            <ChatBox/>
        </div>
    </div>
    :
    <Navigate to={'/auth'}/>
  )
}

export default ChatPage
