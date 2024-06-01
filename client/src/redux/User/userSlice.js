import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    currentUser: null,
    error:null,
    loading:false
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(action,payload)=>{
            state.error=null,
            state.loading=true
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.error=null;
            state.loading=null;
        },
        signInFailure:(state,action)=>{
            state.currentUser=null;
            state.error=action.payload
            state.loading=false
        },
        
    }
})

export const {signInFailure,signInSuccess,signInStart}=userSlice.actions;
export default userSlice.reducer