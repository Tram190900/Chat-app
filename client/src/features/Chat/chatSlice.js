import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChatRequest } from "../../api/chatAPI";

export const getChat = createAsyncThunk("chat/getChat", async(params)=>{
    try {
        const currentListChat = await getChatRequest(params)
        return currentListChat.data
    } catch (error) {
        throw error
    }
})

const chatSlice = createSlice({
    name: 'chat',
    initialState:{
        current:{
            members:[],
            _id:''
        }
    },
     reducers:{},
     extraReducers : (builder)=>{
        builder
        .addCase(getChat.fulfilled, (state, action)=>{
            state.current= action.payload
        })
     }
    //  extraReducers:{
    //     [getChat.fulfilled]:(state, action)=>{
    //         state.current = action.payload
    //     }
    //  }
})
const {reducer} = chatSlice
export default reducer