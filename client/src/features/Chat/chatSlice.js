import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChatRequest, postChatRequest } from "../../api/chatAPI";

export const getChat = createAsyncThunk(
  "chat/getChat",
  async (params, thunkAPI) => {
    try {
      if (!thunkAPI.getState().chat.current._id) {
        const currentListChat = await getChatRequest(params);
        return currentListChat.data;
      }
    } catch (error) {
      throw error;
    }
  }
);
export const handleSelectedChat = createAsyncThunk(
  "chat/handleSelectedChat",
  async (params) => {
    try {
      const selectedChat = await getChatRequest(params);
      return selectedChat.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const handleCreateChat=createAsyncThunk('chat/handleCreateChat', async(url, data)=>{
  try {
    const createChat = await postChatRequest(url, data)
    return createChat.data
  } catch (error) {
    console.log(error);
  }
})

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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChat.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(handleSelectedChat.fulfilled, (state, action) => {
        state.selectedChat = action.payload;
      })
      .addCase(handleCreateChat.fulfilled, (state,action)=>{
        state.current = [...state.current, action.payload]
      })
  },
  //  extraReducers:{
  //     [getChat.fulfilled]:(state, action)=>{
  //         state.current = action.payload
  //     }
  //  }
});
const { reducer,actions } = chatSlice;
export const {handleExitsChat} =actions
export default reducer;
