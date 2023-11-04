import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../../api/userAPI";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (params, thunkAPI) => {
    try {
      const currentUser = await postRequest(params.param1, params.param2);
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
  extraReducers: {
    [getUser.pending]: (state) => {
      state.loading = true;
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export default reducer;
