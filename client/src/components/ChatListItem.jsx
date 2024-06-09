import React from 'react'
import {Avatar} from 'flowbite-react'

import {setCurrentChat} from '../redux/Chat/chatSlice'
import { useSelector,useDispatch } from 'react-redux'
const ChatListItem = ({chat}) => {
  const dispatch=useDispatch();
  const {Chats,currentChat} =useSelector(state=>state.chat)
  return (
    <div className={`flex gap-5 border-y-2 p-2 mb-2 bg-gray-200 cursor-pointer rounded hover:bg-gray-300 ${currentChat &&currentChat._id===chat._id && "!bg-green-400"}`} onClick={()=>{dispatch(setCurrentChat(chat))}}>
      <Avatar img={chat.profilePicture} alt="avatar" rounded />
      <div className=''>
        <h1 className=''>{chat.chatName}</h1>
        <p>{chat.lastMessage}</p>
      </div>
    </div>
  )
}

export default ChatListItem
