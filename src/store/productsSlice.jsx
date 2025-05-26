import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loadingProducts: false,
  products: [],
  allProducts: [],
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/products`
    );
    return result.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    searchProducts: (state, action) => {
      state.products = state.allProducts.filter((product) =>
        product.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    filterByPrice: (state, action) => {
      state.products = state.allProducts.filter(
        (product) => product.price <= action.payload
      );
    },
    filterByCat: (state, action) => {
      state.products = state.allProducts.filter(
        (product) =>
          product.category.toLowerCase() === action.payload.toLowerCase()
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload || "Something went wrong.";
        state.loadingProducts = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.allProducts = action.payload;
        state.loadingProducts = false;
      });
  },
});

export const { searchProducts, filterByPrice, filterByCat } =
  productSlice.actions;

export default productSlice.reducer;
