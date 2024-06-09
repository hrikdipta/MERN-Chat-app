import { createSlice, current } from '@reduxjs/toolkit'

const initialState ={
    Chats:[],
    currentChat:null
}

export const chatSlice =createSlice({
    name:'chat',
    initialState,
    reducers:{
        setChat:(state,action)=>{
            state.Chats=action.payload
        },
        setCurrentChat:(state,action)=>{
            state.currentChat=action.payload
        },
        addChat:(state,action)=>{
            state.Chats=[action.payload,...state.Chats];
            state.currentChat=action.payload;
        }
    }
})

export const {setChat,setCurrentChat,addChat}=chatSlice.actions;
export default chatSlice.reducer