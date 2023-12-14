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
    message: null,
  },
  reducers: {
    handleSetMessage:(state, action)=>{
      state.message = [...state.message, action.payload]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMessage.fulfilled, (state, action) => {
      state.message = action.payload;
    })
    .addCase(sendMessage.fulfilled, (state, action)=>{
      state.message = [...state.message, action.payload]
    });
  },
});
const { actions, reducer } = messageSlide;
export const {handleSetMessage} = actions
export default reducer;
