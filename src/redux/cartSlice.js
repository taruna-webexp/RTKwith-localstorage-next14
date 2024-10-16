import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  }
);

// Define the initial state
const initialState = {
  cartItems: [],
  products: [],
  category: [],

  wishList: JSON.parse(localStorage.getItem("wishListItems")) || [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action) {
      console.log("1111111111111", action);
      state.cartItems = action.payload;
    },
    setSearchItems(state, action) {
      state.products = action.payload;
    },
    setWishList(state, action) {
      const idExist = state.wishList.find(
        (item) => item.id === action.payload.id
      );
      console.log("ifIdExist", idExist);
      if (idExist) {
        state.wishList = state.wishList.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.wishList.push(action.payload);
      }
      localStorage.setItem("wishListItems", JSON.stringify(state.wishList));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.map((item) => ({
          ...item,
          quantity: 1, // Add quantity property to each product
        }));
        state.category = [
          ...new Set(action.payload.map((item) => item.category)),
        ]; // Ensure unique categories
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { setCartItems, setSearchItems, setWishList } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
