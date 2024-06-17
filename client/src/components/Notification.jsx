import React from 'react'
import { FaBell } from "react-icons/fa";
const Notification = () => {
  return (
    <div className='relative'>
        <button type='button' className='inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'><FaBell className='text-xl' /></button>
      <div className='absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900'></div>
    </div>
  )
}

export default Notification
