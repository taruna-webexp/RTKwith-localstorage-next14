// src/features/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  cart: [],
};

const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.items = action.payload;
    },
  }
});

export const {setCartItems } = productSlice.actions;
export default productSlice.reducer;
