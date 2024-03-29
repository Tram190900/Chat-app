import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserRequest, postUserRequestNoneToken } from "../../api/userAPI";


export const getUser = createAsyncThunk(
  "user/getUser",
  async (params, thunkAPI) => {
    try {
      const currentUser = await postUserRequestNoneToken(params.param1, params.param2);
      return currentUser.data
    } catch (error) {
      throw error.response.data
    }
  }
);
export const getFriends = createAsyncThunk("user/getFriends", async(params)=>{
  try {
    const currentFriends = await getUserRequest(params)
    return currentFriends.data.friends
  } catch (error) {
    throw error.response.data
  }
})


const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {
      _id: "",
      name: "",
      email: "",
      token: "",
    },
    currentFriends:[],
    newFriend:null,
    loading: false,
    error: "",
    onlineUsers:[]
  },
  
  reducers: {
    handleGetOnlineUsers:(state, action)=>{
      state.onlineUsers = action.payload
    },
    handleNewFriends:(state,action)=>{
      state.newFriend = action.payload
    }
  },
  extraReducers: (builder)=>{
    builder
    .addCase(getUser.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload;
    })
    .addCase(getFriends.fulfilled, (state, action)=>{
      state.currentFriends = action.payload
    });
  }
});

const { actions, reducer } = userSlice;
export const {handleGetOnlineUsers, handleNewFriends} = actions
export default reducer;
