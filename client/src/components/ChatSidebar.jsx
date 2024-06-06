import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { setChat } from '../redux/Chat/chatSlice'
import ChatListItem from './ChatListItem'
import { HiPlus } from "react-icons/hi";
const ChatSidebar = () => {
  const {currentUser}=useSelector(state=>state.user)
  const {Chats,currentChat} =useSelector(state=>state.chat)
  console.log(currentChat)
  const dispatch = useDispatch();
  const fetchChats =async()=>{
    const res = await fetch('/api/chat/',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
      }
    })
    if(!res.ok){
      return;
    }
    const data = await res.json();
    dispatch(setChat(data))
  }

  useEffect(()=>{
    if(currentUser){
      fetchChats()
    }
    
  },[])
  return (
    <div className=' min-w-96 text-left  border-r-2  min-h-screen pr-2'>
      <div className='flex  items-center justify-between mb-2'>
        <h1 className='text-2xl font-semibold'>Chats</h1>
        <button color="light" className='flex items-center justify-center border-2 p-2 rounded hover:bg-gray-200 mx-2'><HiPlus className='text-2xl'/> <p className='font-semibold'>New Group</p></button>
      </div>
      {
        Chats && Chats.map((chat)=>(
          <ChatListItem key={chat._id} chat={chat} />
        ))
      }
    </div>
  )
}

export default ChatSidebar
