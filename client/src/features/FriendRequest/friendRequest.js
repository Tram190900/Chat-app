import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";   
import { getFriendRequest } from "../../api/friendRequestAPI";

export const getFriendRequestByRecipient = createAsyncThunk("friendRequest/getAllRequest", async(params)=>{
    try {
        const current = await getFriendRequest(params)
        return current.data
    } catch (error) {
        throw error.response.data
    }
})

const friendRequest = createSlice({
    name:'friendRequest',
    initialState:{
        currentRequest:{
            sender:'',
            recipient:'',
            stateAccept:false,
            createdAt:null
        }
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getFriendRequestByRecipient.fulfilled,(state, action)=>{
            state.currentRequest = action.payload
        })
    }
});

const { reducer } = friendRequest;
export default reducer;