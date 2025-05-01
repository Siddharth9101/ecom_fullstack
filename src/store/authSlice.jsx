import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogIn(state) {
      state.isLoggedIn = true;
    },
    setLogOut(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { setLogIn, setLogOut } = authSlice.actions;
export default authSlice.reducer;
