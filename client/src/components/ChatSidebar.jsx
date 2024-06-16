import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { setChat } from '../redux/Chat/chatSlice'
import ChatListItem from './ChatListItem'
import { HiPlus } from "react-icons/hi";
import { Modal, Button } from 'flowbite-react'
import GroupChatModal from './GroupChatModal';
const ChatSidebar = () => {
  const {currentUser}=useSelector(state=>state.user)
  const {Chats,currentChat} =useSelector(state=>state.chat)
  const [groupChatModal,setGroupChatModal] = useState(false)
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
    <div className={`w-full md:w-1/3 p-4 ${currentChat?'hidden' : 'flex flex-col '} md:flex md:flex-col text-gray-800` }>
      <div className='flex items-center justify-between mb-2 border-b-2 py-2'>
        <h1 className='text-2xl font-semibold'>Chats</h1>
        <GroupChatModal>
          <button  color="light" className='flex items-center justify-center border-2 p-2 rounded hover:bg-gray-200 mx-2'><HiPlus className='text-2xl'/> <p className='font-semibold'>New Group</p></button>
        </GroupChatModal>
      </div>
      <div className='h-full overflow-y-scroll hide-scrollbar '>
        {
          Chats && Chats.map((chat)=>(
            <ChatListItem key={chat._id} chat={chat} />
          ))
        }
      </div>
    </div>
  )
}

export default ChatSidebar
