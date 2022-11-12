import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser(state, action){
        state.user = action.payload.user;
        state.isAuthenticated = action.payload.isAuthenticated;
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice;
