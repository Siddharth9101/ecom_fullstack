import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loadingProducts: false,
  products: [],
  allProducts: [],
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
            title: "Women Peach-Coloured Floral Kurta",
            image: "/1.jpg",
            price: 2999,
            category: "women's wear",
          },
          {
            id: 2,
            title: "Bell Sleeves Thread Work Pure Cotton A-Line Kurta",
            image: "/2.jpg",
            price: 1574,
            category: "women's wear",
          },
          {
            id: 3,
            title: "Anarkali Pure Cotton Kurta ",
            image: "/3.jpg",
            price: 1199,
            category: "women's wear",
          },
          {
            id: 4,
            title: "Printed Slim Fit Polo Collar Cotton T-shirt",
            image: "/4.jpg",
            price: 679,
            category: "men's wear",
          },
          {
            id: 5,
            title: "Men Typography Printed T-shirt",
            image: "/5.jpg",
            price: 434,
            category: "men's wear",
          },
          {
            id: 6,
            title: "Graphic Printed Oversized T-shirt",
            image: "/6.jpg",
            price: 485,
            category: "men's wear",
          },
          {
            id: 7,
            title: "Boys Printed T-Shirt and Joggers",
            image: "/7.jpg",
            price: 493,
            category: "kid's wear",
          },
          {
            id: 8,
            title: "Girls Printed Round Neck Pure Cotton Top",
            image: "/8.jpg",
            price: 879,
            category: "kid's wear",
          },
        ]);
      }, 1000);
    });
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
