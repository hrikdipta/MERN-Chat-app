import React from 'react'
import { useSelector } from 'react-redux'
const MessageBubble = ({message}) => {
    const {currentUser} = useSelector(state=>state.user)
  return (
      <div className={`my-2  ${currentUser._id===message?.sender?._id ? 'text-end' : 'text-start'} `} >
        <span className={`p-1.5 self-end rounded-tr-md rounded-bl-md text-gray-800 ${currentUser._id!==message?.sender?._id ? 'bg-green-400' : 'bg-cyan-400'}`} >{message.text}</span>
      </div>
  )
}

export default MessageBubble
