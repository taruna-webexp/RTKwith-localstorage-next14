"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";
import checkOutReducer from "../redux/checkOutSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    checkout: checkOutReducer,
  },
});
