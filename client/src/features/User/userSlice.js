import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postUserRequest } from "../../api/userAPI";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (params, thunkAPI) => {
    try {
      const currentUser = await postUserRequest(params.param1, params.param2);
      return currentUser.data
    } catch (error) {
      throw error.response.data
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {
      _id: "",
      name: "",
      email: "",
      token: "",
    },
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder)=>{
    builder
    .addCase(getUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload;
    });
  }
});

const { actions, reducer } = userSlice;
export default reducer;
