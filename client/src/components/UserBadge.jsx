import React from 'react'
import { Badge } from 'flowbite-react'
import { RxCross2 } from "react-icons/rx";
const UserBadge = ({member,handleDelete}) => {
  return (
    
      <Badge color="info" size='sm' >
        <div className='flex items-center'>
          <span className=''>{member.name}</span>
          <span onClick={()=>{handleDelete(member)}}><RxCross2 className='cursor-pointer'/></span>
        </div>
      
      </Badge>
    
  )
}

export default UserBadge
