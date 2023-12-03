import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessageRequest } from "../../api/messageAPI";
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

const messageSlide = createSlice({
  name: "message",
  initialState: {
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessage.fulfilled, (state, action) => {
      state.message = action.payload;
    });
  },
});
const { actions, reducer } = messageSlide;
export default reducer;
