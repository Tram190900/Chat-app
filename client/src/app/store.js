import {configureStore} from '@reduxjs/toolkit'
import userReducer from './../features/User/userSlice'
import chatReducer from './../features/Chat/chatSlice'

const rootReducer ={
    user: userReducer,
    chat: chatReducer
}

const store = configureStore({
    reducer: rootReducer,
})

export default store