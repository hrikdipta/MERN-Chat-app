import React, { Children, useState } from 'react'
import { Navbar,Spinner,TextInput,Avatar,Dropdown,Drawer} from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { Link,useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import UserListItem from './UserListItem';
import {addChat} from '../redux/Chat/chatSlice'
import Notification from './Notification';
function NavbarComponent() {
  const{currentUser}=useSelector((state)=>state.user)
  const dispatch=useDispatch();
  const{Chats}=useSelector((state)=>state.chat)

  const navigate=useNavigate();
  const[ drawer,setdrawer]=useState(false);
  const[search,setSearch]=useState(null);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);
  const [searchResults,setSearchResults]=useState([]);
  // console.log(searchResults)
  const handleClose=()=>{
    setdrawer(false);
  }
  const handleSearch=async()=>{
    if(!search)
      return;
    try {
      setLoading(true);
      const res= await fetch(`/api/user/getusers?search=${search}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
        }
      })
      const data=await res.json();
      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  const createChat=async(userId)=>{
    if(!userId)
      return;
    if(Chats.find((chat)=>chat.members.find((member)=>member._id===userId) )){
      setdrawer(false);
      console.log('chat already exist')
      return;
    }
    try {
      const res= await fetch('/api/chat/createchat',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          userId
        })
      })
      const data=await res.json();
      if(!res.ok){
        setError(data);
        return;
      }
      dispatch(addChat(data));
      setdrawer(false);
    } catch (error) {
      setError(error);
    }
  }
  return (
    <div className=''>
      <Navbar fluid rounded className='py-3 border-b-2 px-3 md:px-6'>
          <TextInput className='md:block hidden' id="search" type="text" required placeholder='search' icon={HiSearch}  autoComplete='off' onClick={()=>{setdrawer(true)}}/>
          <HiSearch className='md:hidden text-gray-600 text-2xl'/>
          <h1 className='text-3xl font-bold  self-center'>ChatNexus</h1>
          
        <div className='flex items-center gap-4'>
          <Notification/>
          <Dropdown 
        inline
        label={
          <Avatar id='dropdown' img={currentUser && currentUser.profilePicture} alt="avatar" rounded  />
        }
        >
          <Dropdown.Header>
            <span className="block text-sm">{currentUser.name}</span>
            <span className="block truncate text-sm font-medium">{currentUser.email}</span>
          </Dropdown.Header>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        </div>
        
      </Navbar>
      <Drawer open={drawer} onClose={handleClose}>
        <Drawer.Header title="Search Users" />
        <Drawer.Items>
          <div className=' flex items-center w-full'>
          <TextInput className='mr-4 w-full' id="search" type="text" required placeholder='search' autoComplete='off' onChange={(e)=>{setSearch(e.target.value)}} />
          {loading ? <Spinner className='text-gray-600'/> :<HiSearch className=' text-gray-600 text-3xl cursor-pointer' onClick={handleSearch}/>}
          </div>
          <p className='text-left my-2'>Results</p>
          
          {
            searchResults.map((user)=>(
              <UserListItem key={user._id} user={user} createChat={createChat}/>
            ))
          }
        </Drawer.Items>
      </Drawer>
    </div>
  )
}

export default NavbarComponent
