import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFriendRequest } from "../../api/friendRequestAPI";

export const getFriendRequestByRecipient = createAsyncThunk(
  "friendRequest/getAllRequest",
  async (params) => {
    try {
      const current = await getFriendRequest(params);
      return current.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);
export const getFriendRequestBySender = createAsyncThunk(
  "friendRequest/getFriendRequestBySender",
  async (params) => {
    try {
      const current = await getFriendRequest(params);
      return current.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const friendRequest = createSlice({
  name: "friendRequest",
  initialState: {
    currentRequest: {
      sender: "",
      recipient: "",
      stateAccept: null,
      createdAt: null,
    },
    sendedRequest: {
      sender: "",
      recipient: "",
      stateAccept: null,
      createdAt: null,
    },
    newRequest:{
      sender: "",
      recipient: "",
      stateAccept: null,
      createdAt: null,
    }
  },
  reducers: {
    handleNewRequest:(state, action)=>{
      console.log(action.payload);
      state.newRequest = action.payload
    },
    handleGetRequest:(state,action)=>{
      state.currentRequest=[...state.currentRequest, action.payload]
    },
    handleSendRequest:(state,action)=>{
      state.sendedRequest=[...state.sendedRequest,action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFriendRequestByRecipient.fulfilled, (state, action) => {
        state.currentRequest = action.payload;
      })
      .addCase(getFriendRequestBySender.fulfilled, (state, action) => {
        state.sendedRequest = action.payload;
      });
  },
});

const { reducer, actions } = friendRequest;
export const {handleNewRequest, handleGetRequest} = actions
export default reducer;
