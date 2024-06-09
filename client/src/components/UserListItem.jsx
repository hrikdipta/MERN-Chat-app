import React from 'react'
import {Avatar} from 'flowbite-react'
function UserListItem({user,createChat}) {
  return (
    <div className='flex border-2 p-2 rounded-md cursor-pointer border-transparent bg-gray-300 hover:bg-green-500 hover:text-white' onClick={()=>{createChat(user)}}>
      <Avatar img={user && user.profilePicture} alt="avatar" rounded />
      <div className='flex flex-col text-left ml-4'>
        <h1>{user && user.name}</h1>
        <p className='text-xs'>{user && user.email}</p>
      </div>
    </div>
  )
}

export default UserListItem
