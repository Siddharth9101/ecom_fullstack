import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = localStorage.getItem("user")
  ? {
      cartItems: JSON.parse(localStorage.getItem("user")).cartItems,
    }
  : {
      cartItems: [],
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          cartItems: state.cartItems,
        })
      );
      toast.success("Added to cart");
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          cartItems: state.cartItems,
        })
      );
    },
    emptyCart: (state) => {
      state.cartItems = [];
      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          cartItems: state.cartItems,
        })
      );
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
