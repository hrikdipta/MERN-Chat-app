import React from 'react'
import {Avatar} from 'flowbite-react'
import { getSender } from '../config/getSender'
import {setCurrentChat} from '../redux/Chat/chatSlice'
import { useSelector,useDispatch } from 'react-redux'
const ChatListItem = ({chat}) => {
  const dispatch=useDispatch();
  const {Chats,currentChat} =useSelector(state=>state.chat)
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div className={`flex gap-5 border-y-2 p-2 mb-2 bg-gray-200 cursor-pointer rounded hover:bg-gray-300 ${currentChat &&currentChat._id===chat._id && "!bg-green-400"}`} onClick={()=>{dispatch(setCurrentChat(chat))}}>
      <Avatar img={chat.isGroup === true ? "" : getSender(currentUser,chat.members).profilePicture} alt="avatar" rounded className='object-cover' />
      <div className='text-left'>
        <h3 className=' font-semibold'>{chat.isGroup === true ? chat.chatName : getSender(currentUser,chat.members).name }</h3>
        <p className=' text-sm'>{chat.lastMessage?.text}</p>
      </div>
    </div>
  )
}

export default ChatListItem
