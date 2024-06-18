import React, { useEffect, useState } from 'react'
import ChatInput from './ChatInput'
import {useSelector,useDispatch} from 'react-redux'
import {getSender} from '../config/getSender.js'
import {Spinner,TextInput,Button} from 'flowbite-react'
import { IoMdSend } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import MessageBubble from './MessageBubble.jsx'
import {io} from 'socket.io-client'
const ChatBox = () => {
  const {currentChat} = useSelector(state=>state.chat)
  const {currentUser} = useSelector(state=>state.user)
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [error,setError]=useState(null);
  const [messages,setMessages]= useState([]);
  const [socket,setSocket]=useState(null);
  const ENDPOINT = import.meta.env.VITE_API_URL;
  useEffect(()=>{
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);
  },[])
  useEffect(()=>{
    if(socket){
      socket.emit('setup',currentUser);
    }
  },[socket,currentUser])
  useEffect(()=>{
    if(socket){
      socket.on('message',(message)=>{
        if(message.chatId._id.toString() === currentChat?._id.toString()){
          setMessages([...messages,message]);
        }
      })
    }
  })
  const handleTypeing = (e) => {
    setNewMessage(e.target.value)
  }
  const sendMessage =async (e)=>{
    e.preventDefault();
    if(newMessage.trim()=== '') 
      return;
    try {
      const res= await fetch('/api/message',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          chatId : currentChat._id,
          content: {
            text: newMessage
          }
        })
      })
      const data = await res.json();
      setNewMessage('');
      if(!res.ok){
        setError(data.message);
      }
      setMessages([...messages,data]);
      socket.emit('message',data,currentChat,currentUser);
    } catch (error) {
      setError(error.message);
    }
  }
  const fetchMessages = async ()=>{
    if(!currentChat) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/message/${currentChat._id}`);
      const data = await res.json();
      setLoading(false);
      if(!res.ok){
        return setError(data.message);
      }
      setMessages(data);
      socket.emit('join chat',currentChat);
    } catch (error) {
      setError(error.message);
    }
  }
  useEffect(()=>{
    if(currentChat && socket){
      fetchMessages();
    }
  },[currentChat,socket])
  return (
    <div className={`flex-1  my-3 p-3 rounded-md  border-2 ${currentChat ? 'flex flex-col' : 'hidden'} md:flex md:flex-col`}>
      {
        currentChat ? 
        <div className='flex-col flex flex-1 h-full '>
          <div className='text-2xl flex justify-between'>
            <h3>{currentChat.isGroup ==true ?currentChat.chatName:getSender(currentUser,currentChat.members).name}</h3>
          </div>
          <div  className='bg-gray-200 rounded-md px-3 flex flex-col flex-1 h-46 overflow-y-auto hide-scrollbar'>
            {
              messages && messages.map((message,index)=>(
                <MessageBubble key={message._id} message={message}/>
              ))
            }
          </div>
          <div className='self-end w-full mt-1'>
              <form className=' flex h-fit gap-2 w-full ' onSubmit={sendMessage}>
                <Button color="success" className='p-0'><FiPlus className='text-2xl' /></Button>
                <TextInput type="text" placeholder="Write Something..." required className='w-full' value={newMessage} onChange={handleTypeing} />
                <Button color="success" type='submit' className='p-0'><IoMdSend className='text-2xl' /></Button>
              </form>
          </div>
        </div>:
        <div className='flex items-center justify-center h-full'>
          <h1 className='text-xl'>Select a chat to start messaging</h1>
        </div>
      }
    </div>
  )
}

export default ChatBox
