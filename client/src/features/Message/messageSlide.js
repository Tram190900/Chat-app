import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessageRequest, postMessageRequest } from "../../api/messageAPI";
export const getMessage = createAsyncThunk(
  "message/getMessage",
  async (param) => {
    try {
      const message = await getMessageRequest(param);
      return message.data;
    } catch (error) {
      throw error;
    }
  }
);
export const sendMessage = createAsyncThunk('message/sendMessage', async({url, data})=>{
  try {
    const newMessage = await postMessageRequest(url, data)
    return newMessage.data
  } catch (error) {
    throw error
  }
})

const messageSlide = createSlice({
  name: "message",
  initialState: {
    currenMessage: null,
    newMessage: null,
    notification:[]
  },
  reducers: {
    handleSetMessage: (state, action) => {
      state.currenMessage = [...state.currenMessage, action.payload];
    },
    handleSetNotificationRead:(state,action)=>{
      state.notification=[{...action.payload, isRead: true},...state.notification]
    },
    handleSetNotification:(state, action)=>{
      state.notification = [action.payload, ...state.notification]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessage.fulfilled, (state, action) => {
      state.currenMessage = action.payload;
    })
    .addCase(sendMessage.fulfilled, (state, action)=>{
      state.newMessage = action.payload
      state.currenMessage = [...state.currenMessage, action.payload]
    });
  },
});
const { actions, reducer } = messageSlide;
export const {handleSetMessage, handleSetNotificationRead, handleSetNotification, handleClearNotification} = actions
export default reducer;
