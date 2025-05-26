import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("user")
  ? {
      isLoggedIn: true,
      user: JSON.parse(localStorage.getItem("user")),
    }
  : {
      isLoggedIn: false,
      user: null,
    };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.isLoggedIn = true;
      const user = action.payload;
      user.cartItems = [];
      state.user = user;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
