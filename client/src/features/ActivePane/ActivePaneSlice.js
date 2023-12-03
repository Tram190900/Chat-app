import { createSlice } from "@reduxjs/toolkit";

const activePaneSlice = createSlice({
    name: "activePane",
    initialState: {
      active:'chat',
    },
    reducers: {
        selectActive:(state, action)=>{
            state.active = action.payload
        }
    },
  });
  
  const { reducer, actions } = activePaneSlice;
  export const {selectActive} = actions
  export default reducer;