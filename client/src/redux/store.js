import { configureStore} from '@reduxjs/toolkit'
import userReducer from './User/userSlice'
import chatReducer from './Chat/chatSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';

export const store = configureStore({
    reducer:{
        user:userReducer,
        chat:chatReducer
    }
})