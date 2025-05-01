import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loadingProducts: false,
  products: [],
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            image: "/new-arrivals-1.webp",
            title: "Sample - Clothing And Accessory Boutiques For Sale",
            price: "48.99",
          },
          {
            id: 2,
            image: "/new-arrivals-2.webp",
            title: "Sample - Clothing And Accessory Boutiques For Sale",
            price: "48.99",
          },
          {
            id: 3,
            image: "/new-arrivals-3.webp",
            title: "Sample - Clothing And Accessory Boutiques For Sale",
            price: "48.99",
          },
          {
            id: 4,
            image: "/new-arrivals-4.webp",
            title: "Sample - Clothing And Accessory Boutiques For Sale",
            price: "48.99",
          },
          {
            id: 5,
            image: "/new-arrivals-1.webp",
            title: "Sample - Clothing And Accessory Boutiques For Sale",
            price: "48.99",
          },
          {
            id: 6,
            image: "/new-arrivals-2.webp",
            title: "Sample - Clothing And Accessory Boutiques For Sale",
            price: "48.99",
          },
          {
            id: 7,
            image: "/new-arrivals-3.webp",
            title: "Sample - Clothing And Accessory Boutiques For Sale",
            price: "48.99",
          },
          {
            id: 8,
            image: "/new-arrivals-4.webp",
            title: "Sample - Clothing And Accessory Boutiques For Sale",
            price: "48.99",
          },
          {
            id: 9,
            image: "/trending1.webp",
            title: "Sample - Clothing And Accessory Boutiques For Sale",
            price: "$48.99",
          },
          {
            id: 10,
            image: "/trending2.webp",
            title: "Sample - Clothing And Accessory Boutiques For Sale",
            price: "$48.99",
          },
          {
            id: 11,
            image: "/trending3.webp",
            title: "Sample - Clothing And Accessory Boutiques For Sale",
            price: "$48.99",
          },
          {
            id: 12,
            image: "/trending4.webp",
            title: "Sample - Clothing And Accessory Boutiques For Sale",
            price: "$48.99",
          },
          {
            id: 13,
            image: "/trending1.webp",
            title: "Sample - Clothing And Accessory Boutiques For Sale",
            price: "$48.99",
          },
          {
            id: 14,
            image: "/trending2.webp",
            title: "Sample - Clothing And Accessory Boutiques For Sale",
            price: "$48.99",
          },
          {
            id: 15,
            image: "/trending3.webp",
            title: "Sample - Clothing And Accessory Boutiques For Sale",
            price: "$48.99",
          },
          {
            id: 16,
            image: "/trending4.webp",
            title: "Sample - Clothing And Accessory Boutiques For Sale",
            price: "$48.99",
          },
        ]);
      }, 3000);
    });
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loadingProducts = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loadingProducts = false;
      });
  },
});

// export const

export default productSlice.reducer;
