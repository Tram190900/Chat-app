import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChatRequest, postChatRequest } from "../../api/chatAPI";

export const getChatByUser = createAsyncThunk(
  "chat/getChatByUser",
  async (params, thunkAPI) => {
    try {
      if (!thunkAPI.getState().chat.current._id) {
        const currentListChat = await getChatRequest(params);
        return currentListChat.data;
      }
    } catch (error) {
      throw error.response.data;
    }
  }
);
export const handleSelectedChat = createAsyncThunk(
  "chat/handleSelectedChatByChatId",
  async (params) => {
    try {
      const selectedChat = await getChatRequest(params);
      return selectedChat.data;
    } catch (error) {
      throw error.response.data
    }
  }
)

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    current: {
      members: [],
      _id: "",
    },
    selectedChat: {
        members: [],
        _id: "",
    },
  },
  reducers: {
    handleExitsChat:(state,action)=>{
      state.selectedChat=action.payload
    },
    handleNewChat:(state, action)=>{
      state.current=[...state.current, action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatByUser.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(handleSelectedChat.fulfilled, (state, action) => {
        state.selectedChat = action.payload;
      })
  },
});
const { reducer,actions } = chatSlice;
export const {handleExitsChat, handleNewChat} =actions
export default reducer;
