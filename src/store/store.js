"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cart";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
