import React from 'react'
import ChatInput from './ChatInput'
import {useSelector,useDispatch} from 'react-redux'
import {getSender} from '../config/getSender.js'
const ChatBox = () => {
  const {currentChat} = useSelector(state=>state.chat)
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div className={`flex-1  my-3 p-3 rounded-md overflow-y-auto border-2 ${currentChat ? 'flex flex-col' : 'hidden'} md:flex md:flex-col`}>
      {
        currentChat ? 
        <div className='flex-col flex h-full'>
          <div className='text-2xl flex justify-between'>
            <h3>{currentChat.isGroup ==true ?currentChat.chatName:getSender(currentUser,currentChat.members).name}</h3>
          </div>
          <div className='bg-gray-200 rounded-md px-3 flex flex-1  '>
            hi
          </div>
        </div>:
        <div className='flex items-center justify-center h-full'>
          <h1 className='text-xl '>Select a chat to start messaging</h1>
        </div>
      }
    </div>
  )
}

export default ChatBox
