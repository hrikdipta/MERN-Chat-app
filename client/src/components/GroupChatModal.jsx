import React, { useEffect, useState } from 'react'
import { Modal, Button,TextInput,Spinner } from 'flowbite-react'
import UserListItem from './UserListItem';
import UserBadge from './UserBadge';
import {useDispatch,useSelector} from 'react-redux'
import { addChat } from '../redux/Chat/chatSlice';
const GroupChatModal = ({children}) => {
    const [openModal, setOpenModal] = useState(false);
    const [members, setMembers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    useEffect(()=>{
        const getUsers = async()=>{
            if(search===''){
                setSearchResults([])
                return;
            }
            setLoading(true);
            const res = await fetch(`/api/user/getusers?search=${search}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                }
            })
            if(!res.ok){
                setLoading(false);
                return;
            }
            const data = await res.json();
            setLoading(false);
            setSearchResults(data);
        }
        getUsers();
    },[search])
    const addMember = (user)=>{
      if(members.find((member)=>member._id===user._id)){
        return;
      }
      setMembers([...members,user]);
    }
    const handleDelete=(member)=>{
      setMembers(members.filter((m)=>m._id!==member._id))
    }
    const handleCreateChat =async(e)=>{
      e.preventDefault();
      if(!groupName || members.length===0){
        setError('Please fill all the fields');
        return;
      }
      try {
        setError(null);
        setLoading(true)
        const res =await fetch('/api/chat/creategroupchat',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({
            chatName : groupName,
            members:members.map((member)=>member._id)
          })
        })
        setLoading(false);
        if(!res.ok){
          setError('Something went wrong');
          return;
        }
        const data= await res.json();
        dispatch(addChat(data));
        setOpenModal(false);
        setMembers([]);
        setSearchResults([]);
        setGroupName('');
        setSearch('');
      } catch (error) {
        setLoading(false);
        setError('Something went wrong');
      }
    }
  return (
    <div>
        <span onClick={()=>{setOpenModal(true)}}>{children}</span>
    <Modal show={openModal} size="md" onClose={()=>{setOpenModal(false)}} popup>
      <Modal.Header/>
        <Modal.Body >
        <h3 className='text-2xl font-semibold mb-3'>Create a Group</h3>
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleCreateChat}>   
            <TextInput id="groupName" type="text" placeholder="Group Name" required onChange={(e) => { setGroupName(e.target.value) }} />
            <TextInput id="particapents" type="text" placeholder='Add Members' required onChange={(e) => { setSearch(e.target.value) }} />
            <div className='flex flex-wrap gap-2'>
              {
                members.map((member)=>(
                  <UserBadge key={member._id} member={member} handleDelete={handleDelete} />
                ))
              }
            </div>
            <div className='h-64 overflow-y-scroll flex flex-col gap-2'>
              {
                searchResults && searchResults.slice(0, 5).map((user) => (
                  <UserListItem key={user._id} user={user} createChat={addMember} />
                ))
              }
            </div>
            
        <Button type='submmit'>
          {loading ? <Spinner/> : 'Create'}
        </Button>            
        </form>
        {error && <div className='text-red-500 text-center mt-2'>{error}</div>}
        </Modal.Body>
      </Modal>
      
    </div>
  )
}

export default GroupChatModal
