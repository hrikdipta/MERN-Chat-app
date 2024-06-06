import { configureStore ,combineReducers } from '@reduxjs/toolkit'
import userReducer from './User/userSlice'
import chatReducer from './Chat/chatSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer=combineReducers({
    user:userReducer,
    chat:chatReducer
})

const persistConfig={
    key:'root',
    storage:storage,
    version:1
}

const persistedReducer = persistReducer(persistConfig,rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:false
    }),
})

export const persistor= persistStore(store);