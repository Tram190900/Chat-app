import {configureStore} from '@reduxjs/toolkit'
import userReducer from './../features/User/userSlice'
import chatReducer from './../features/Chat/chatSlice'
import activePaneReducer from './../features/ActivePane/ActivePaneSlice'
import messageReducer from './../features/Message/messageSlide'
import friendRequestReducer from './../features/FriendRequest/friendRequest'

const rootReducer ={
    user: userReducer,
    chat: chatReducer,
    activePane: activePaneReducer,
    message: messageReducer,
    friendRequest: friendRequestReducer
}

const store = configureStore({
    reducer: rootReducer,
})

export default store